# Opera `(GX too)` Custom Homepage Bypass

This tutorial is split into 2 parts: one showing how to just change it using NTSP and the second showing how to bypass the `?abfocus` block by Opera.

## Part 1: Changing the Homepage

- Download [NTSP](https://chromewebstore.google.com/detail/new-tab-start-page/mjfahldkpjhcnfbbmdhpjolcjpcfhcpj) from the Chrome Web Store.

- Go to [Configuration](chrome-extension://mjfahldkpjhcnfbbmdhpjolcjpcfhcpj/options.html).

- Fill up `Custom URL` with whatever you want, but I will go with steps needed to use [New Tab Draft](https://chromewebstore.google.com/detail/new-tab-draft/nmfjkeiebceinkbggliapgfdjphocpdh). For that, you need to paste in `chrome-extension://nmfjkeiebceinkbggliapgfdjphocpdh/index.html`.

- Go to the bottom and save.

Now it will work, but it won't focus on the address bar on NTD homepage load because of Opera's blocking.

## Part 2: Websocket Injection `With Python`

First, we need to bypass CSP and File System Integrity and Permissions.

- Go to [Extensions](opera://extensions/) and enable Developer Mode.

> In the step below, we are ultimately disabling updates for NTD, so if you want the newest version, you will need to do these steps and manually update NTD each time!

- Now we need to load NTD locally. Go to `Load Unpacked` and enter NTD's folder:

```text
%APPDATA%\Opera Software\Opera Stable\Default\Extensions\nmfjkeiebceinkbggliapgfdjphocpdh\(your_version)
```

> The above path is Opera-specific. I don't have Opera GX to give the correct path, but it will be similar.

- Now we need to edit NTD's `index.html` because we want to use Python to focus on the address bar using a keyboard shortcut.

- At the end of `index.html`, before `</body></html>`, paste `<script src="./js/websocket-client.js"></script>` and save.

It should look like this:

```html
<script src="./js/main.bundle.js"></script><script src="./js/websocket-client.js"></script></body></html>
```

- Now we need to inject our `websocket-client.js` into NTD's `./js/` folder. Download it and put it there. (If the default ports don't suit your use case, you can change them.)

> You need to have Python installed. Before doing these steps, make sure you have all the required libraries:
> `pip install pygetwindow pyautogui websockets asyncio`

- Now we need to run `websocket-listener.py`. I recommend this way:

- Go to `%USERPROFILE%\Documents` and place the `websocket-listener.py` file there.

- Now go to `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup` and place the `operaCHB.bat` file there.

- You can also run the batch file and open a new tab to make sure everything works.

> Make sure you have unmodified keyboard shortcuts in Opera. Try manually doing CTRL + L in the browser to check if it focuses on the address bar.

If the address bar doesn't get auto-focused, in `operaCHB.bat`, change `pythonw` to `python` and try debugging the issues here.
