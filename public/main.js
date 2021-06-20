require('@electron/remote/main').initialize()
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require("child_process");
const isDev = require('electron-is-dev');
const path = require('path');
const usersController = require('./controllers/usersController')
const testController = require('./controllers/testController');

ipcMain.on('run speed test', (event, arg) => {
  exec('speed-test -j -v', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
  
  testController.addNewTest(stdout)

  // pass result back to client
  event.reply('asynchronous-reply', stdout) 
  });
})

ipcMain.on('get all data', async (event, arg) => {
  const allSpeedData = await getSpeedData();
  event.reply('data-reply', allSpeedData)
})

async function getSpeedData() {
  const results = await testController.getAllTestData();
  return results;
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  usersController.initUser()  
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


