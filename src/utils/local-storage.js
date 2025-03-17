const prefix = 'PRM-';

export const buildKey = (key) => {
  return `${prefix}${key}`;
}

export const setItem = (key, value) => {
  const lsKey = buildKey(key);
  localStorage.setItem(lsKey, JSON.stringify(value));
}

export const getItem = (key) => {
  const lsKey = buildKey(key);
  const item = localStorage.getItem(lsKey);

  if (!item) {
    return null;
  }

  return JSON.parse(item);
}

export const removeItem = (key) => {
  const lsKey = buildKey(key);
  localStorage.removeItem(lsKey);
}
