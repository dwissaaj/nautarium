pub mod notes;

use duckdb::Connection;

pub fn initialize(connection: &Connection) -> Result<(), String> {
    connection.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS notes (
            id VARCHAR PRIMARY KEY,
            title VARCHAR NOT NULL DEFAULT 'Untitled',
            content TEXT NOT NULL DEFAULT '',
            x DOUBLE NOT NULL DEFAULT 100,
            y DOUBLE NOT NULL DEFAULT 100,
            color VARCHAR NOT NULL DEFAULT 'default',
            is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    ).map_err(|e| e.to_string())
}