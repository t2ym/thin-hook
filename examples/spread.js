let gA1 = [ 1, 2 ];
let gX1 = { a: 1, b: 2 };
{
  let a2 = [ 3, 4, ...gA1 ];
  let y = { c: 3, ...gX1 };
  let z = { a: 1, ...{ a: 1, b: 2, ...(function () { return y; })() } };
}
