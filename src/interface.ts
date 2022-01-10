export interface TabManagerWorkerCallerParams {
  workerPath: string
  workerName?: string
}

export interface IWorkerMessageData {
  type: string;
  id?: string;
}
