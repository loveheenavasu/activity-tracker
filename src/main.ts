import { app, BrowserWindow, ipcMain, desktopCapturer } from "electron";
import { uIOhook } from "uiohook-napi";
import path from "path";
import fs from "fs";

if (require("electron-squirrel-startup")) {
  app.quit();
}
console.log("MAIN_WINDOW_VITE_NAME", MAIN_WINDOW_VITE_NAME);
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  process.traceProcessWarnings = true;
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// async function emptyDirectory() {
//   const diretoryPath = __dirname.replace(".vite/build", "screenshots");
//   if (fs.existsSync(diretoryPath)) {
//     const files = fs.readdirSync(diretoryPath);

//     if (files.length > 0) {
//       files.forEach((file) => {
//         const filePath = path.join(__dirname, file);
//         const isFile = fs.statSync(filePath).isFile();
//         if (isFile) {
//           fs.unlinkSync(filePath);
//         } else {
//           emptyDirectory();
//         }
//       });
//     }
//   }
// }

async function captureScreenshot(source: any) {
  return await source.thumbnail.toPNG();
}

async function saveScreenshot(image: any, fileName: string) {
  const filePath = path.join(
    __dirname.replace(".vite/build", "screenshots"),
    fileName
  );

  fs.writeFileSync(filePath, image);
  return filePath;
}
const userActivity = {
  keyboardClickCount: 0,
  mouseClickCount: 0,
};

async function getScreenShot() {
  return new Promise((res, rej) => {
    desktopCapturer
      .getSources({
        types: ["window", "screen"],
        thumbnailSize: { width: 1920, height: 1080 },
      })
      .then(async (sources) => {
        let pathOfImage;
        let image;
        for (const source of sources) {
          if (source.name == "Entire screen") {
            image = await captureScreenshot(source);
            const fileName = `screenshot_${Date.now()}.png`;
            pathOfImage = await saveScreenshot(image, fileName);
            res(pathOfImage);
          }
        }
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  });
}

app.on("ready", createWindow);
app.whenReady().then(() => {
  // emptyDirectory();
  ipcMain.handle("userActivity", async () => {
    uIOhook.start();
    const screenshot = await getScreenShot();
    const userActivityWithScreenshot = {
      screenshot,
      userActivity: { ...userActivity },
    };
    userActivity.keyboardClickCount = 0;
    userActivity.mouseClickCount = 0;
    return userActivityWithScreenshot;
  });
  ipcMain.handle("resetUserActivity", async () => {
    userActivity.keyboardClickCount = 0;
    userActivity.mouseClickCount = 0;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
uIOhook.on("keydown", () => {
  userActivity.keyboardClickCount = userActivity.keyboardClickCount + 1;
});
uIOhook.on("click", () => {
  userActivity.mouseClickCount = userActivity.mouseClickCount + 1;
});
