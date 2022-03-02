export const choice = <T extends Array<unknown>>(array: T): T[number] => {
  return array[Math.ceil(Math.random() * array.length - 1)];
};
