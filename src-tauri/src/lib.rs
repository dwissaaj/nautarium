mod database;

use database::initialize;

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
    println!("NAUTARIUM TAURI RUN FUNCTION STARTED");
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(&app_data_dir)?;

            let database_path = app_data_dir.join("nautarium-dev.db");

            // Initialize the database connection and all tables.
            let connection = initialize(&database_path)
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