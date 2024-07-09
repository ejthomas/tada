import { IpcHandler } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler;
    electron: {
      getStoreValue: () => Promise<ItemData[]>;
      setStoreValue: (value: ItemData[]) => Promise<void>;
    };
  }

  type ItemData = {
    id: string;
    is_completed: boolean;
    title: string;
  };
}
