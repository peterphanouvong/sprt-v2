import { add } from "./add";

describe("add tests", () => {
  it("should add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
