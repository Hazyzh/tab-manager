import { EventEmitter } from 'events';
import { v4 as uuid } from 'uuid';

import {
  TabsManagerEvents,
  workerEvents,
} from './helper';
import {
  IWorkerMessageData,
  TabsManagerWorkerCallerParams,
} from './interface';

export class TabsManagerWorkerCaller extends EventEmitter {
  private readonly workerPath: string;

  private readonly workerName: string;

  private workerInstance: SharedWorker;

  private readonly id: string;

  isActive = true;

  constructor(options: TabsManagerWorkerCallerParams) {
    super();
    this.workerPath = options.workerPath;
    if (!this.workerPath || typeof this.workerPath !== 'string') {
      this.error('Required workerPath parameters missed!');
    }
    this.workerName = options.workerName ?? 'Tab Manager';
    this.id = uuid();
  }

  init() {
    this.initWorker();
    this.initWorkerListener();
    this.initDomListener();
  }

  private initWorker() {
    if (!window.SharedWorker) {
      this.error('ShareWorker not support!');
      return;
    }
    this.workerInstance = new SharedWorker(this.workerPath, this.workerName);
  }

  private initWorkerListener() {
    this.workerInstance.port.addEventListener('message', (e: MessageEvent) => {
      console.log('eeee', e);
      const { type, id } = e.data;
      if (type === workerEvents.activeTabId) {
        const isActive = id === this.id;
        this.isActive = isActive;
        this.emit(TabsManagerEvents.activeTab, isActive);
      }
    });

    this.workerInstance.onerror = (ev: ErrorEvent) => {
      const { message } = ev;
      this.error(message);
    };

    this.workerInstance.port.start();
  }

  private initDomListener() {
    if (!this.workerInstance) return;

    window.addEventListener('focus', this.setActiveTab);
    document.addEventListener('visibilitychange', this.setActiveTab);
    window.addEventListener('unload', this.closeWindow);

    if (document.visibilityState === 'visible') {
      this.setActiveTab();
    } else {
      this.checkActiveTab();
    }
  }

  private sendMessage(data: IWorkerMessageData) {
    this.workerInstance.port.postMessage(data);
  }

  private setActiveTab = () => {
    this.sendMessage({
      type: workerEvents.setActiveTab,
      id: this.id,
    });
  };

  private checkActiveTab = () => {
    this.sendMessage({
      type: workerEvents.checkActiveTab,
      id: this.id,
    });
  };

  private closeWindow = () => {
    this.sendMessage({
      type: workerEvents.closeWindow,
      id: this.id,
    });
  };

  private error(message: string) {
    this.emit(TabsManagerEvents.error, message);
  }
}

export default TabsManagerWorkerCaller;
