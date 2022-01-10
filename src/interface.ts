export interface TabsManagerWorkerCallerParams {
  workerPath: string
  workerName?: string
}

export interface IWorkerMessageData {
  type: string;
  id?: string;
}
