export const parseObject = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return value;
  }
};
