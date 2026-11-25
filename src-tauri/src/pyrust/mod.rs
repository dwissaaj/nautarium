use std::io::Write;
use std::process::{Command, Stdio};

#[tauri::command]
pub fn run_python(message: String) -> Result<String, String> {
    let project_dir = std::path::Path::new(env!("CARGO_MANIFEST_DIR"));

    let python_executable = project_dir
        .join("python")
        .join(".venv")
        .join("bin")
        .join("python");

    let python_script = project_dir
        .join("python")
        .join("src")
        .join("main.py");

    let mut child = Command::new(python_executable)
        .arg(python_script)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|error| format!("Failed to launch Python: {error}"))?;

    if let Some(mut stdin) = child.stdin.take() {
        writeln!(stdin, "{message}")
            .map_err(|error| format!("Failed to send message: {error}"))?;
    }

    let output = child
        .wait_with_output()
        .map_err(|error| format!("Failed to receive response: {error}"))?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    String::from_utf8(output.stdout)
        .map(|response| response.trim().to_string())
        .map_err(|error| format!("Invalid Python output: {error}"))
}