import gcd from "./euclidean-algorithm";

describe("Greates Common Divisor", () => {
  it("should calculate GCD", () => {
    expect(gcd(0, 0)).toBe(0);
    expect(gcd(2, 0)).toBe(2);
    expect(gcd(0, 2)).toBe(2);
    expect(gcd(1, 2)).toBe(1);
    expect(gcd(2, 1)).toBe(1);
    expect(gcd(6, 6)).toBe(6);
    expect(gcd(2, 4)).toBe(2);
    expect(gcd(4, 2)).toBe(2);
    expect(gcd(12, 4)).toBe(4);
    expect(gcd(4, 12)).toBe(4);
    expect(gcd(5, 13)).toBe(1);
    expect(gcd(27, 13)).toBe(1);
    expect(gcd(24, 60)).toBe(12);
    expect(gcd(60, 24)).toBe(12);
    expect(gcd(252, 105)).toBe(21);
    expect(gcd(105, 252)).toBe(21);
    expect(gcd(1071, 462)).toBe(21);
    expect(gcd(462, 1071)).toBe(21);
    expect(gcd(462, -1071)).toBe(21);
    expect(gcd(-462, -1071)).toBe(21);
  });
});
