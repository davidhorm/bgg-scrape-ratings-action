export const pipe = (...functions: Function[]) => (value?) =>
  functions.reduce(
    (currentValue, currentFunction: Function) => currentFunction(currentValue),
    value,
  );

export const pipeAsync = (...fns) => (arg) =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

export const print = (value: any) => {
  console.log(value);
  return value;
};
