import {
  tabManagerEvents,
  TabManagerWorkerCaller,
} from '../src';

const tabManager = new TabManagerWorkerCaller({
  workerPath: 'worker.js',
});

tabManager.addListener(tabManagerEvents.activeTab, e => document.title = e ? 'active' : 'no active');
tabManager.init();
