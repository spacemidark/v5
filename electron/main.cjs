    'use strict';
    // Electron main process: opens the existing React/Vite app in a native window.
    // The renderer has no Node.js access, no remote code execution, and no IPC bridge.
    const path = require('node:path');
    const { pathToFileURL } = require('node:url');
    const { app, BrowserWindow, protocol, net, shell, session } = require('electron');

    const DESKTOP_ORIGIN = 'app://desktop';
    const DEVELOPMENT_URL = 'http://127.0.0.1:5173';
    const distRoot = path.resolve(__dirname, '..', 'dist');

    protocol.registerSchemesAsPrivileged([
      { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }
    ]);

    function registerBundledFiles() {
      protocol.handle('app', (request) => {
        let parsed;
        try { parsed = new URL(request.url); } catch { return new Response('Bad URL', {status: 400}); }
        if (parsed.hostname !== 'desktop') return new Response('Not found', {status: 404});

        let requestedPath;
        try { requestedPath = decodeURIComponent(parsed.pathname).replace(/^\/+/, '') || 'index.html'; }
        catch { return new Response('Bad path', {status: 400}); }

        // Never serve files from outside the Vite production output directory.
        const filePath = path.resolve(distRoot, requestedPath);
        const relative = path.relative(distRoot, filePath);
        if (relative.startsWith('..') || path.isAbsolute(relative)) {
          return new Response('Forbidden', {status: 403});
        }
        return net.fetch(pathToFileURL(filePath).toString());
      });
    }

    function isAppUrl(url) {
      return app.isPackaged ? url.startsWith(DESKTOP_ORIGIN + '/') : url.startsWith(DEVELOPMENT_URL + '/');
    }
    function openExternal(url) {
      try {
        if (new URL(url).protocol === 'https:') void shell.openExternal(url);
      } catch { /* Ignore invalid URLs. */ }
    }

    function createWindow() {
      const window = new BrowserWindow({
        title: 'Inside the Jet Engine',
        width: 1440,
        height: 920,
        minWidth: 900,
        minHeight: 600,
        show: false,
        autoHideMenuBar: true,
        backgroundColor: '#061310',
        icon: path.join(__dirname, '..', 'desktop-assets', 'icon.ico'),
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          sandbox: true,
          webSecurity: true,
          devTools: !app.isPackaged
        }
      });

      window.once('ready-to-show', () => window.show());
      window.webContents.setWindowOpenHandler(({url}) => {
        openExternal(url);
        return { action: 'deny' };
      });
      window.webContents.on('will-navigate', (event, url) => {
        if (isAppUrl(url)) return;
        event.preventDefault();
        openExternal(url);
      });

      if (app.isPackaged) {
        void window.loadURL(`${DESKTOP_ORIGIN}/index.html`).catch((err)=>console.error('Could not load packaged app:', err));
      } else {
        void window.loadURL(DEVELOPMENT_URL).catch((err)=>console.error('Start the Vite server first:', err));
      }
    }

    app.whenReady().then(() => {
      registerBundledFiles();
      session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
      createWindow();
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
