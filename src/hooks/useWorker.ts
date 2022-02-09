import { useEffect } from "react";
import WorkerBuilder from "../worker/workerBuilder";

const useWorker = (worker: Function) => {
  const instance = new WorkerBuilder(worker);
  useEffect(() => {
    return () => instance.terminate();
    //eslint-disable-next-line
  }, []);

  return instance;
};

export default useWorker;
