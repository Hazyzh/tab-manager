import { TabsManagerWorkerCaller } from '../src/caller';
import { TabsManagerEvents } from '../src/helper';

const tabManager = new TabsManagerWorkerCaller({
  workerPath: 'worker.js',
});

tabManager.addListener(TabsManagerEvents.activeTab, (isActive: boolean) => {
  document.title = isActive ? '✅ active' : 'inactive';
});
tabManager.init();
