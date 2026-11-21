use std::path::Path;

use duckdb::Connection;
use tauri::State;

use crate::database::{
    ProjectState,
    ActiveProject,
    task
};



#[tauri::command]
pub fn create_project(
    state: State<'_, ProjectState>,
    name: String,
    path: String,
) -> Result<String, String> {
    let project_name = name.trim();

    if project_name.is_empty() {
        return Err("Project name cannot be empty.".to_string());
    }

    let project_path = Path::new(&path);

    if project_path.exists() {
        return Err("A file already exists at this location.".to_string());
    }

    let connection = Connection::open(&path)
        .map_err(|error| {
            format!("Failed to create project database: {error}")
        })?;

    connection
        .execute_batch(
            r#"
            CREATE TABLE IF NOT EXISTS project_info (
                id VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS datasets (
                id VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                source VARCHAR,
                row_count BIGINT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS dataset_columns (
                id VARCHAR PRIMARY KEY,
                dataset_id VARCHAR NOT NULL,
                column_name VARCHAR NOT NULL,
                data_type VARCHAR
            );
            "#,
        )
        .map_err(|error| {
            format!("Failed to initialize project tables: {error}")
        })?;

    task::initialize(&connection)?;

    connection
        .execute(
            r#"
            INSERT INTO project_info (id, name)
            VALUES (?, ?)
            "#,
            duckdb::params!["project", project_name],
        )
        .map_err(|error| {
            format!("Failed to save project information: {error}")
        })?;

    let saved_name: String = connection
        .query_row(
            "SELECT name FROM project_info WHERE id = 'project'",
            [],
            |row| row.get(0),
        )
        .map_err(|error| {
            format!("Failed to read project information: {error}")
        })?;

    let mut active = state
        .active
        .lock()
        .map_err(|error| error.to_string())?;

    *active = Some(ActiveProject {
        connection,
        name: saved_name.clone(),
        path,
    });

    Ok(saved_name)
}

#[tauri::command]
pub fn open_project(
    state: State<'_, ProjectState>,
    path: String,
) -> Result<String, String> {
    let project_path = Path::new(&path);

    if !project_path.is_file() {
        return Err("Project file does not exist.".to_string());
    }

    let connection = Connection::open(&path)
        .map_err(|error| {
            format!("Failed to open project database: {error}")
        })?;

    let project_name: String = connection
        .query_row(
            "SELECT name FROM project_info WHERE id = 'project'",
            [],
            |row| row.get(0),
        )
        .map_err(|error| {
            format!(
                "Invalid Nautarium project file. \
                Project information could not be read: {error}"
            )
        })?;

    task::initialize(&connection)?;

    let mut active = state
        .active
        .lock()
        .map_err(|error| error.to_string())?;

    *active = Some(ActiveProject {
        connection,
        name: project_name.clone(),
        path,
    });

    Ok(project_name)
}