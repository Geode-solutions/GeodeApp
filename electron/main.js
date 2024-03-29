const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "Vease",
    icon: "public/favicon.ico",
    center: true,
  });
  win.removeMenu();

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC, "index.html"));
  }
});
