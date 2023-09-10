export const delayFor = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};
