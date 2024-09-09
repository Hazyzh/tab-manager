export interface TabsManagerWorkerCallerParams {
  workerPath: string
  workerOptions?: string | Record<string, unknown>
}

export interface IWorkerMessageData {
  type: string;
  id?: string;
}
