import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
// import { JSONSchemaType } from "ajv"
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

export type StoreType = {
  todos: ItemData[];
};

// const schema: JSONSchemaType<StoreType> = {
//   type: "object",
//   properties: {
//     todos: {
//       type: "array",
//       items: {
//         type: "object",
//         properties: {
//           id: { type: "string" },
//           is_completed: { type: "boolean" },
//           title: { type: "string" },
//         },
//         required: ["id", "is_completed", "title"],
//       },
//     },
//   },
//   required: ["todos"],
// };

export const STORE_KEYS: { [key: string]: keyof StoreType } = {
  TODOS: "todos",
};

export const store = new Store<StoreType>({
  defaults: {
    todos: []
  },
});

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.handle("getStoreValue", async (_) => {
  return store.get("todos")
})

ipcMain.handle("setStoreValue", async (_, value: ItemData[]) => {
  store.set("todos", value)
})