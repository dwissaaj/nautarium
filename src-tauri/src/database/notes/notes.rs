
use duckdb::{params, Connection};
use serde::Serialize;
use tauri::State;
use uuid::Uuid;
use std::sync::Mutex;

pub struct DatabaseState {
    pub connection: Mutex<Connection>,
}

#[derive(Debug, Serialize)]
pub struct Note {
    pub id: String,
    pub title: String,
    pub content: String,
    pub x: f64,
    pub y: f64,
    pub color: String,
    pub is_pinned: bool,
    pub created_at: String,
    pub updated_at: String,
}

// CREATE
#[tauri::command]
pub fn create_note(
    state: State<'_, DatabaseState>,
    title: String,
) -> Result<Note, String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;
    let id = Uuid::new_v4().to_string();

    connection.execute(
        "INSERT INTO notes (id, title) VALUES (?, ?)",
        params![id, title],
    ).map_err(|e| e.to_string())?;

    get_by_id(&connection, &id)
}

// READ ONE
fn get_by_id(connection: &Connection, id: &str) -> Result<Note, String> {
    connection.query_row(
        r#"
        SELECT id, title, content, x, y, color, is_pinned,
               CAST(created_at AS VARCHAR),
               CAST(updated_at AS VARCHAR)
        FROM notes WHERE id = ?
        "#,
        params![id],
        |row| {
            Ok(Note {
                id: row.get(0)?,
                title: row.get(1)?,
                content: row.get(2)?,
                x: row.get(3)?,
                y: row.get(4)?,
                color: row.get(5)?,
                is_pinned: row.get(6)?,
                created_at: row.get(7)?,
                updated_at: row.get(8)?,
            })
        },
    ).map_err(|e| e.to_string())
}

// READ ALL
#[tauri::command]
pub fn get_notes(
    state: State<'_, DatabaseState>,
) -> Result<Vec<Note>, String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;

    let mut statement = connection.prepare(
        r#"
        SELECT id, title, content, x, y, color, is_pinned,
               CAST(created_at AS VARCHAR),
               CAST(updated_at AS VARCHAR)
        FROM notes ORDER BY updated_at DESC
        "#,
    ).map_err(|e| e.to_string())?;

    let rows = statement.query_map([], |row| {
        Ok(Note {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            x: row.get(3)?,
            y: row.get(4)?,
            color: row.get(5)?,
            is_pinned: row.get(6)?,
            created_at: row.get(7)?,
            updated_at: row.get(8)?,
        })
    }).map_err(|e| e.to_string())?;

    rows.collect::<Result<Vec<Note>, _>>()
        .map_err(|e| e.to_string())
}

// UPDATE
#[tauri::command]
pub fn update_note(
    state: State<'_, DatabaseState>,
    id: String,
    title: String,
    content: String,
    x: f64,
    y: f64,
    color: String,
    is_pinned: bool,
) -> Result<(), String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;

    let affected = connection.execute(
        r#"
        UPDATE notes
        SET title = ?, content = ?, x = ?, y = ?, color = ?,
            is_pinned = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        "#,
        params![title, content, x, y, color, is_pinned, id],
    ).map_err(|e| e.to_string())?;

    if affected == 0 {
        return Err("Note not found".into());
    }

    Ok(())
}

// DELETE
#[tauri::command]
pub fn delete_note(
    state: State<'_, DatabaseState>,
    id: String,
) -> Result<(), String> {
    let connection = state.connection.lock().map_err(|e| e.to_string())?;

    let affected = connection.execute(
        "DELETE FROM notes WHERE id = ?",
        params![id],
    ).map_err(|e| e.to_string())?;

    if affected == 0 {
        return Err("Note not found".into());
    }

    Ok(())
}
