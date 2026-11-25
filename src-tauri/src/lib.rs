mod audio;
mod database;
mod project;
mod pyrust;

use database::ProjectState;

use crate::pyrust::{
    run_python
};

use crate::database::task::task::{
    create_task,
    delete_task,
    get_tasks,
    update_task,
};

use crate::project::project::{
    create_project,
    open_project,
};
use crate::audio::asr::whisper::{
    transcribe_audio,
    load_whisper
};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    println!("NAUTARIUM TAURI RUN FUNCTION STARTED");

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(ProjectState::default())
        .manage(audio::asr::WhisperState::default())
        .invoke_handler(tauri::generate_handler![
            greet,
            create_task,
            get_tasks,
            update_task,
            delete_task,
            create_project,
            open_project,
            load_whisper,
            transcribe_audio,
            run_python
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}