import { TabManagerWorkerCaller } from '../src/caller';
import { tabManagerEvents } from '../src/helper';

const tabManager = new TabManagerWorkerCaller({
  workerPath: 'worker.js',
});

tabManager.addListener(tabManagerEvents.activeTab, (isActive: boolean) => {
  document.title = isActive ? '🧐 active' : 'inactive';
});
tabManager.init();
