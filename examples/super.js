{
  let baseObject = {
    method(x, y) {
      return x + y;
    }
  };
  let subObject = {
    method(x, y) {
      return super.method(x, y) * 2;
    }
  };
  Object.setPrototypeOf(subObject, baseObject);
  subObject.method(2, 3) === 10;
}
