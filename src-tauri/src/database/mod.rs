pub mod task;

use duckdb::Connection;
use std::sync::Mutex;

pub struct ActiveProject {
    pub connection: Connection,
    pub name: String,
    pub path: String,
}

pub struct ProjectState {
    pub active: Mutex<Option<ActiveProject>>,
}

impl Default for ProjectState {
    fn default() -> Self {
        Self {
            active: Mutex::new(None),
        }
    }
}