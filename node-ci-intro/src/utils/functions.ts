// Just a simple function to demonstrate how to unit test a function

const isEven = (number: number): boolean => {
  if (number < 0) throw new Error('Number must be positive');
  if (typeof number !== 'number') throw new Error('Number must be a number');
  return number % 2 === 0;
};

export {isEven};
