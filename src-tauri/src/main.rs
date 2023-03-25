// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
/*#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}*/

#[tauri::command]
async fn create_window(app: tauri::AppHandle, fullscreen: bool) {
    println!("Creating window");
    tauri::WindowBuilder::new(
        &app,
        "external", /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap())
      )
      .fullscreen(fullscreen)
      .build()
      .expect("failed to build window");
}

#[tauri::command]
async fn set_window_fullscreen(app: tauri::AppHandle, fullscreen: bool){
    app.get_window("main").unwrap().set_fullscreen(fullscreen);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_window,set_window_fullscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
