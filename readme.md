# Opera `(GX too)` Custom Homepage Bypass

This tutorial is split in 2 parts, one showing how to just change it using NTSP and second how to bypass `?abfocus` block by Opera.

## Part 1: Changing the Homepage

- Download [NTSP](https://chromewebstore.google.com/detail/new-tab-start-page/mjfahldkpjhcnfbbmdhpjolcjpcfhcpj) from Chrome Web Store.

- Go to [Configuration](chrome-extension://mjfahldkpjhcnfbbmdhpjolcjpcfhcpj/options.html).

- Fill up `Custom URL` with whatever you want, but I will go with steps needed to use [New Tab Draft](https://chromewebstore.google.com/detail/new-tab-draft/nmfjkeiebceinkbggliapgfdjphocpdh). For that you need to paste in `chrome-extension://nmfjkeiebceinkbggliapgfdjphocpdh/index.html`.

- Go to the bottom and save.

Now it will work, but it won't focus on adress bar on NTD homepage load because of Opera's blockage.

## Part 2: Websocket injection `With Python`

First, we need to bypass CSP and File System Integrity and Permissions.

- Go to [Extensions](opera://extensions/) and enable Developer Mode

> In the step below we are ultimatly disabling updates for NTD so if you want newest version you will need to do these steps and manually update NTD each time!

- Now we need to load up NTD localy, go to `Load Unpacked` and enter NTD's folder:

```text
%APPDATA%\Opera Software\Opera Stable\Default\Extensions\nmfjkeiebceinkbggliapgfdjphocpdh\(your_version)
```

> Above path is Opera specific, i don't have Opera GX to give correct path, but it will be simillar.

- Now we need to edit NTD's `index.html`, because we want to use python to focus on adress bar using keyboard shortcut.

- At the end of index.html, before `</body></html>` paste `<script src="./js/websocket-client.js"></script>` and save.

It should look like this:

```html
<script src="./js/main.bundle.js"></script><script src="./js/websocket-client.js"></script></body></html>
```

- Now we need to inject our `websocket-client.js` into NTD's `./js/` folder, download it and put it there. `(If deafult ports don't suit your use case, you can change them)`

> You need to have python installed, before doing this steps make sure you have all the required libraries:
> `pip install pygetwindow pyautogui websockets asyncio`

- Now we need to run `websocket-listener.py`, I recommend this way:

- Go into `%USERPROFILE%\Documents` and put `websocket-listener.py` file there.

- Now go into `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup` and put `operaCHB.bat` file.

- You can also run it now to make sure everything works.

> Make sure you have unmodified keyboard shortcuts in Opera, try manually doing CTRL + L in browser to check if it focuses on adress bar.

If adress bar doesnt get auto focused, in operaCHB.bat change `pythonw` to `python` and try debugging the issues here
