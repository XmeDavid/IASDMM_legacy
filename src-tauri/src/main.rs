// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
/*#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}*/

#[tauri::command]
async fn create_window(app: tauri::AppHandle, window_label: &str, title: &str, fullscreen: bool, x: f64, y: f64) -> tauri::Result<()> {
    println!("Creating window");
    tauri::WindowBuilder::new(
        &app,
        window_label, /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap())
      )
      .title(title)
      .position(x,y)
      .fullscreen(fullscreen)
      .focused(true)
      .build()
      .expect("failed to build window");
    Ok(())
}

#[tauri::command]
async fn set_window_fullscreen(app: tauri::AppHandle, fullscreen: bool){
    app.get_window("main").unwrap().set_fullscreen(fullscreen);
}

fn main() {
    tauri::Builder::default()
        //.plugin(tauri_plugin_window_state::Builder::default().build()) // Add the plugin to ensure windows open as they were last closed
        .invoke_handler(tauri::generate_handler![create_window,set_window_fullscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
