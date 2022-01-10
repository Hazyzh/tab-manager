import { workerEvents } from './helper';
import { IWorkerMessageData } from './interface';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any,no-restricted-globals
const globalSelf = self as any;

export class TabsManagerWorkerServer {
  private connections: MessagePort[] = [];

  private activeId: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private protIdMap: WeakMap<any, string> = new WeakMap();

  init() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalSelf.addEventListener('connect', (e: any) => {
      const port: MessagePort = e.ports[0];
      this.connections.push(port);
      port.addEventListener('message', this.portListener(port));
      port.start();
    });
  }

  private portListener = (port: MessagePort) => (e: MessageEvent) => {
    const { type, id } = e.data;
    switch (type) {
      case workerEvents.setActiveTab:
        this.activeId = id;
        this.protIdMap.set(port, id);
        this.broadcastMessage({ type: workerEvents.activeTabId, id: this.activeId });
        break;
      case workerEvents.checkActiveTab:
        this.protIdMap.set(port, id);

        if (!this.activeId) {
          this.activeId = id;
        }
        this.broadcastMessage({ type: workerEvents.activeTabId, id: this.activeId });
        break;
      case workerEvents.closeWindow:
        this.connections = this.connections.filter((item) => item !== port);
        if (this.activeId === id) {
          this.protIdMap.delete(port);
          this.activeId = this.protIdMap.get(this.connections[0]);
          this.broadcastMessage({ type: workerEvents.activeTabId, id: this.activeId });
        }
        break;
      default:
    }
  };

  private broadcastMessage = (data: IWorkerMessageData) => {
    this.connections.forEach((port) => {
      port.postMessage(data);
    });
  };
}

export default TabsManagerWorkerServer;
