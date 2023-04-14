// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn send_data(app: tauri::AppHandle, window_label: &str, data: &str) {
    app.get_window(window_label).unwrap().emit("presentation-data", data).unwrap();
}

#[tauri::command]
async fn create_window(app: tauri::AppHandle, window_label: &str, title: &str, url: &str, fullscreen: bool, x: f64, y: f64) -> tauri::Result<()> {
    tauri::WindowBuilder::new(
        &app,
        window_label,
        tauri::WindowUrl::App(url.into())
      )
      .title(title)
      .position(x,y)
      .fullscreen(fullscreen)
      .focused(false)
      .build()
      .expect("failed to build window");
    Ok(())
}

#[tauri::command]
async fn close_window(app: tauri::AppHandle, window_label: &str) -> tauri::Result<()> {
    return app.get_window(window_label).unwrap().close();
}

#[tauri::command]
async fn set_window_fullscreen(app: tauri::AppHandle, fullscreen: bool) -> tauri::Result<()>{
    return app.get_window("main").unwrap().set_fullscreen(fullscreen);
}

fn main() {
    tauri::Builder::default()
        //.plugin(tauri_plugin_window_state::Builder::default().build()) // Add the plugin to ensure windows open as they were last closed
        .invoke_handler(tauri::generate_handler![
            create_window,
            close_window,
            set_window_fullscreen,
            send_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
