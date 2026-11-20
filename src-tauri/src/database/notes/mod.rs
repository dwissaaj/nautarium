pub mod notes;

use duckdb::Connection;
use std::path::Path;

pub fn initialize(path: &Path) -> Result<Connection, String> {
    let connection = Connection::open(path)
        .map_err(|e| e.to_string())?;

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
    ).map_err(|e| e.to_string())?;

    Ok(connection)
}