export const getLocalSetting = <T>(key: string, defaultValue?: any): T => {
  const localItem = localStorage.getItem(key);

  if (!localItem) return defaultValue as unknown as T;

  try {
    return JSON.parse(localItem);
  } catch {
    return localItem as unknown as T;
  }
};

export const setLocalSetting = <T>(key: string, value: T) => {
  const item = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, item);
};
