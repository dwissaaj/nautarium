
mod database;

use database::notes::initialize;
use database::notes::notes::{
    create_note,
    delete_note,
    get_notes,
    update_note,
    DatabaseState,
};

use database::tasks::tasks::{
    create_task,
    delete_task,
    get_tasks,
    update_task,
};

use std::sync::Mutex;
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(&app_data_dir)?;

            let database_path = app_data_dir.join("nautarium-dev.db");

            // Initialize the existing Notes database.
            let connection = initialize(&database_path)
                .map_err(std::io::Error::other)?;

            // Initialize Tasks using the same database connection.
            database::tasks::tasks::initialize(&connection)
                .map_err(std::io::Error::other)?;

            // Register the shared database connection.
            app.manage(DatabaseState {
                connection: Mutex::new(connection),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            create_note,
            get_notes,
            update_note,
            delete_note,
            create_task,
            get_tasks,
            update_task,
            delete_task,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
