pub mod task;

use duckdb::Connection;

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
        .map_err(|error| error.to_string())
}