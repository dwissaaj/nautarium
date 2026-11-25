use std::path::PathBuf;
use std::sync::{Arc, Mutex};

use any_speech_to_text::{
    AudioInput,
    ModelType,
    SttConfig,
    SttModel,
    TranscriptionRequest,
    load_model,
};

use tauri::{
    AppHandle,
    Manager,
    State,
    path::BaseDirectory,
};

pub struct WhisperState {
    model: Arc<Mutex<Option<Box<dyn SttModel>>>>,
}

impl Default for WhisperState {
    fn default() -> Self {
        Self {
            model: Arc::new(Mutex::new(None)),
        }
    }
}

impl WhisperState {
    fn load(&self, model_path: PathBuf) -> Result<(), String> {
        let mut model = self
            .model
            .lock()
            .map_err(|error| error.to_string())?;

        if model.is_some() {
            return Ok(());
        }

        let config = SttConfig::new(ModelType::WhisperBase)
            .with_model_path(model_path.to_string_lossy().to_string())
            .with_preferred_runtime();

        let loaded_model = load_model(config)
            .map_err(|error| error.to_string())?;

        *model = Some(loaded_model);

        Ok(())
    }

    fn transcribe(
        &self,
        audio_path: PathBuf,
        language: Option<String>,
    ) -> Result<String, String> {
        let model = self
            .model
            .lock()
            .map_err(|error| error.to_string())?;

        let model = model
            .as_ref()
            .ok_or_else(|| "Whisper model is not loaded.".to_string())?;

        let mut request = TranscriptionRequest::new(
            AudioInput::from_file(audio_path),
        );

        if let Some(language) = language {
            request = request.with_language(language);
        }

        let result = model
            .transcribe(&request)
            .map_err(|error| error.to_string())?;

        Ok(result.text)
    }
}

#[tauri::command]
pub async fn load_whisper(
    app: AppHandle,
    state: State<'_, WhisperState>,
) -> Result<(), String> {
    let model_path = app
        .path()
        .resolve(
            "models/audio/whisper-base",
            BaseDirectory::Resource,
        )
        .map_err(|error| error.to_string())?;

    let state = state.model.clone();

    tauri::async_runtime::spawn_blocking(move || {
        let state = WhisperState { model: state };
        state.load(model_path)
    })
    .await
    .map_err(|error| error.to_string())?
}

#[tauri::command]
pub async fn transcribe_audio(
    audio_path: String,
    language: Option<String>,
    state: State<'_, WhisperState>,
) -> Result<String, String> {
    let state = state.model.clone();
    let audio_path = PathBuf::from(audio_path);

    tauri::async_runtime::spawn_blocking(move || {
        let state = WhisperState { model: state };

        state.transcribe(audio_path, language)
    })
    .await
    .map_err(|error| error.to_string())?
}