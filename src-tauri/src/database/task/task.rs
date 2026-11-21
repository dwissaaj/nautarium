use duckdb::{params, Connection};
use serde::Serialize;
use tauri::State;
use uuid::Uuid;

use crate::database::ProjectState;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Task {
    pub id: String,
    pub title: String,
    pub description: String,
    pub status: String,
    pub priority: String,
    pub created_at: String,
}

fn get_task_by_id(connection: &Connection, id: &str) -> Result<Task, String> {
    connection
        .query_row(
            r#"
            SELECT
                id,
                title,
                description,
                status,
                priority,
                CAST(created_at AS VARCHAR)
            FROM tasks
            WHERE id = ?
            "#,
            params![id],
            |row| {
                Ok(Task {
                    id: row.get(0)?,
                    title: row.get(1)?,
                    description: row.get(2)?,
                    status: row.get(3)?,
                    priority: row.get(4)?,
                    created_at: row.get(5)?,
                })
            },
        )
        .map_err(|error| error.to_string())
}

#[tauri::command]
pub fn get_tasks(state: State<'_, ProjectState>) -> Result<Vec<Task>, String> {
    let active = state
        .active
        .lock()
        .map_err(|error| error.to_string())?;

    let Some(project) = active.as_ref() else {
        return Ok(Vec::new());
    };

    let mut statement = project
        .connection
        .prepare(
            r#"
            SELECT
                id,
                title,
                description,
                status,
                priority,
                CAST(created_at AS VARCHAR)
            FROM tasks
            ORDER BY created_at DESC
            "#,
        )
        .map_err(|error| error.to_string())?;

    let rows = statement
        .query_map([], |row| {
            Ok(Task {
                id: row.get(0)?,
                title: row.get(1)?,
                description: row.get(2)?,
                status: row.get(3)?,
                priority: row.get(4)?,
                created_at: row.get(5)?,
            })
        })
        .map_err(|error| error.to_string())?;

    rows.collect::<Result<Vec<Task>, _>>()
        .map_err(|error| error.to_string())
}

#[tauri::command]
pub fn create_task(
    state: State<'_, ProjectState>,
    title: String,
    description: String,
    status: String,
    priority: String,
    created_at: String,
) -> Result<Task, String> {
    let active = state
        .active
        .lock()
        .map_err(|error| error.to_string())?;

    let project = active
        .as_ref()
        .ok_or_else(|| "No project is currently open.".to_string())?;

    let id = Uuid::new_v4().to_string();

    project
        .connection
        .execute(
            r#"
            INSERT INTO tasks (
                id,
                title,
                description,
                status,
                priority,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, CAST(? AS TIMESTAMP))
            "#,
            params![
                id,
                title,
                description,
                status,
                priority,
                created_at
            ],
        )
        .map_err(|error| error.to_string())?;

    get_task_by_id(&project.connection, &id)
}

#[tauri::command]
pub fn update_task(
    state: State<'_, ProjectState>,
    id: String,
    title: String,
    description: String,
    status: String,
    priority: String,
    created_at: String,
) -> Result<(), String> {
    let active = state
        .active
        .lock()
        .map_err(|error| error.to_string())?;

    let project = active
        .as_ref()
        .ok_or_else(|| "No project is currently open.".to_string())?;

    let affected = project
        .connection
        .execute(
            r#"
            UPDATE tasks
            SET
                title = ?,
                description = ?,
                status = ?,
                priority = ?,
                created_at = CAST(? AS TIMESTAMP)
            WHERE id = ?
            "#,
            params![
                title,
                description,
                status,
                priority,
                created_at,
                id
            ],
        )
        .map_err(|error| error.to_string())?;

    if affected == 0 {
        return Err("Task not found.".to_string());
    }

    Ok(())
}

#[tauri::command]
pub fn delete_task(
    state: State<'_, ProjectState>,
    id: String,
) -> Result<(), String> {
    let active = state
        .active
        .lock()
        .map_err(|error| error.to_string())?;

    let project = active
        .as_ref()
        .ok_or_else(|| "No project is currently open.".to_string())?;

    let affected = project
        .connection
        .execute(
            "DELETE FROM tasks WHERE id = ?",
            params![id],
        )
        .map_err(|error| error.to_string())?;

    if affected == 0 {
        return Err("Task not found.".to_string());
    }

    Ok(())
}