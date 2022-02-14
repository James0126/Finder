// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  // eslint-disable-next-line no-restricted-globals
  (self.onmessage = (message) => {
    const { txs, input, style } = message.data;
    const result = txs.map((tx) => {
      const raw_log = tx.raw_log;
      const classname = input
        ? raw_log.includes(input)
          ? undefined
          : style
        : undefined;

      const data = { ...tx, classname };

      return data;
    });
    postMessage(result);
  });
