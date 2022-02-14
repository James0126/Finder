// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  // eslint-disable-next-line no-restricted-globals
  (self.onmessage = (message) => {
    const { txs, input, style } = message.data;
    const result = txs.map((tx: any) => {
      const { raw_log } = tx;
      const classname = input
        ? raw_log.includes(input)
          ? undefined
          : style
        : undefined;

      Object.assign(tx, { classname });
      return tx;
    });
    postMessage(result);
  });
