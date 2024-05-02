import type { Bool } from 'o1js';
import { Provable, Int64 } from 'o1js';

export const getSign = (x: Int64): Int64 => {
  return Provable.if(x.isPositive(), Int64.from(1), Int64.from(-1));
};

export const gr = (a: Int64, b: Int64): Bool => {
  return a.sub(b).isPositive();
};

export const inRange = (
  x: Int64 | number,
  left: Int64 | number,
  right: Int64 | number
): Bool => {
  left = Int64.from(left);
  right = Int64.from(right);
  x = Int64.from(x);

  const order = gr(right, left);
  [left, right] = [
    Provable.if(order, left, right),
    Provable.if(order, right, left),
  ];
  const rightVal = right.sub(x);
  const leftVal = x.sub(left);
  return rightVal.isPositive().and(leftVal.isPositive());
};
