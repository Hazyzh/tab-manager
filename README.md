# tabs-manager
[![npm](https://img.shields.io/npm/v/tabs-manager.svg)](https://www.npmjs.com/package/tabs-manager)
[![license](https://img.shields.io/npm/l/tabs-manager.svg)](https://www.npmjs.com/package/tabs-manager)

Let's assume that there is HTML page including some special logic, that logics will trigger by some event listener. Users maybe open multiple tabs all including this page. Once the event is emitted, all tabs will trigger that event, that's may caused some performance issue or unexpected error. So we would like to mark one tab as `active` tab, once we received the event, only this tab will trigger to execution the code logic.  

We definition `active tab` to the currently or last tab which users browsing or focusing. 

Here using [SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) to implement this logic.

### Installation

---

```shell
  npm install tabs-manager --save-dev
```

### Usage

---

As I said above, it implement by [SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker), If you don't familiar with it, you should learn the base usage of it first.
we should have a html including client script, also has a `worker.js` using for shared work script.
The file structure like this

```bash
.
├── ...
├── src                         # 
│   ├── client.js               # HTML page script
│   ├── index.html              # HTML page
│   ├── worker.js               # worker script
│   └── ...                     # 
└── ...

```

and here is the example of how to using `tabs-manager`

```javascript
// client.js script
import {
  TabsManagerEvents,
  TabsManagerWorkerCaller,
} from 'tabs-manager';

const tabManager = new TabsManagerWorkerCaller({
  workerPath: 'worker.js',
});

tabManager.addListener(TabsManagerEvents.activeTab, (isActive) => {
  document.title = isActive ? '✅ active' : 'inactive';
});
tabManager.init();

// worker.js script
import { TabsManagerWorkerServer } from 'tabs-manager';

const server = new TabsManagerWorkerServer();
server.init();
```
