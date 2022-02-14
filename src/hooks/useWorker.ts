import { useEffect } from "react";

const useWorker = (worker: Function) => {
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);
  const instance = new Worker(URL.createObjectURL(blob));
  useEffect(() => {
    return () => instance.terminate();
    //eslint-disable-next-line
  }, []);

  return instance;
};

export default useWorker;
