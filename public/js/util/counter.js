const a = () => {
  let count = 0;
  const increment = () => {
    count++;
    return count;
  };
  return increment;
};

let b = a();

const c = (num) => {
  let count = 0;
  const decrement = () => {
    count--;
    return num - count;
  };
  return decrement;
};

let d = c();
