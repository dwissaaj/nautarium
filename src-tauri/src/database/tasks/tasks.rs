
use duckdb::{params, Connection};
use serde::Serialize;
use tauri::State;
use uuid::Uuid;

use crate::database::notes::notes::DatabaseState;

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
            SELECT id, title, description, status, priority,
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
        .map_err(|e| e.to_string())
}

pub fn initialize(connection: &Connection) -> Result<(), String> {
    connection
        .execute_batch(
            r#"
            CREATE TABLE IF NOT EXISTS tasks (
                id VARCHAR PRIMARY KEY,
                title VARCHAR NOT NULL DEFAULT 'Untitled',
                description TEXT NOT NULL DEFAULT '',
                status VARCHAR NOT NULL DEFAULT 'todo',
                priority VARCHAR NOT NULL DEFAULT 'medium',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            "#,
        )
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_tasks(
    state: State<'_, DatabaseState>,
) -> Result<Vec<Task>, String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;

    let mut statement = connection
        .prepare(
            r#"
            SELECT id, title, description, status, priority,
                   CAST(created_at AS VARCHAR)
            FROM tasks
            ORDER BY created_at DESC
            "#,
        )
        .map_err(|e| e.to_string())?;

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
        .map_err(|e| e.to_string())?;

    rows.collect::<Result<Vec<Task>, _>>()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_task(
    state: State<'_, DatabaseState>,
    title: String,
    description: String,
    status: String,
    priority: String,
    created_at: String,
) -> Result<Task, String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;
    let id = Uuid::new_v4().to_string();

    connection
        .execute(
            r#"
            INSERT INTO tasks (id, title, description, status, priority, created_at)
            VALUES (?, ?, ?, ?, ?, CAST(? AS TIMESTAMP))
            "#,
            params![id, title, description, status, priority, created_at],
        )
        .map_err(|e| e.to_string())?;

    get_task_by_id(&connection, &id)
}

#[tauri::command]
pub fn update_task(
    state: State<'_, DatabaseState>,
    id: String,
    title: String,
    description: String,
    status: String,
    priority: String,
    created_at: String,
) -> Result<(), String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;

    let affected = connection
        .execute(
            r#"
            UPDATE tasks
            SET title = ?, description = ?, status = ?,
                priority = ?, created_at = CAST(? AS TIMESTAMP)
            WHERE id = ?
            "#,
            params![title, description, status, priority, created_at, id],
        )
        .map_err(|e| e.to_string())?;

    if affected == 0 {
        return Err("Task not found".into());
    }

    Ok(())
}

#[tauri::command]
pub fn delete_task(
    state: State<'_, DatabaseState>,
    id: String,
) -> Result<(), String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;

    let affected = connection
        .execute("DELETE FROM tasks WHERE id = ?", params![id])
        .map_err(|e| e.to_string())?;

    if affected == 0 {
        return Err("Task not found".into());
    }

    Ok(())
}
