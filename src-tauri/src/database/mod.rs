pub mod notes;
pub mod tasks;

use duckdb::Connection;
use std::path::Path;

pub fn initialize(path: &Path) -> Result<Connection, String> {
    let connection = Connection::open(path)
        .map_err(|e| e.to_string())?;

    notes::initialize(&connection)?;
    tasks::initialize(&connection)?;

    Ok(connection)
}