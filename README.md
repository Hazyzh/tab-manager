# tab-manager

Let's assume that there is HTML page including some special logic, that logics will trigger by some event listener. Users maybe open multiple tabs all including this page. Once the event is emitted, all tabs will trigger that event, that's may caused some performance issue or unexpect error. So we would like to mark one tab as `active` tab, once we recived the event, only this tab will trigger to execution the code logic.  

We definition `active tab` to the currently or last tab which users browsing or focusing. 

Here using shared work to implement this logic.
