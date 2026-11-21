mod database;
mod project;

use database::ProjectState;

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
        .invoke_handler(tauri::generate_handler![
            greet,
            create_task,
            get_tasks,
            update_task,
            delete_task,
            create_project,
            open_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}