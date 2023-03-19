export const getStorage = (name) => {
  return JSON.parse(window.localStorage.getItem(name));
}
export const setStorage = (name, value) => {
  return window.localStorage.setItem(name, JSON.stringify(value));
}
