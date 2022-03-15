const isLength = (value: string, min: number, max: number) => {
  if (value.length < min) {
    return `Input has to be at least ${min} characters long.`;
  }
  if (value.length > max) {
    return `Input has to be max ${max} characters long.`;
  }

  return true;
};

export default isLength;
