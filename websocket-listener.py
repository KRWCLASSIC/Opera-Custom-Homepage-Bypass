import asyncio
import websockets
import pyautogui
import pygetwindow as gw

async def handler(websocket):
    async for message in websocket:
        print(f"Message received: {message}")
        
        # Check if the message signals a new tab opening
        if message == "new_tab_opened":
            print("New tab detected.")
            
            # Check if the active window belongs to opera.exe
            active_window = gw.getActiveWindow()
            if active_window and "Opera" in active_window.title:
                print("Opera detected. Simulating Ctrl + L...")
                # Simulate Ctrl + L using PyAutoGUI
                pyautogui.hotkey('ctrl', 'l')
            else:
                print("Active window is not Opera. Skipping hotkey simulation.")

async def main():
    start_server = await websockets.serve(handler, "localhost", 8765)
    print("Server started")
    await start_server.wait_closed()

# Ensure this runs in an asynchronous environment
if __name__ == "__main__":
    asyncio.run(main())
