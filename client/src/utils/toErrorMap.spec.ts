import { toErrorMap } from "./toErrorMap";

describe("Error map function", () => {
  test("it should change an array of errors into a map of fields and messages", () => {
    const input = [
      { field: "username", message: "too short" },
      { field: "password", message: "password is incorrect" },
    ];

    const output = {
      username: "too short",
      password: "password is incorrect",
    };

    expect(toErrorMap(input)).toEqual(output);
  });

  test("it should return empty object if given an empty array", () => {
    const input = [];
    const output = {};
    expect(toErrorMap(input)).toEqual(output);
  });
});
