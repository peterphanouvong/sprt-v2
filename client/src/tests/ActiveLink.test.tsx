import { cleanup, render } from "@testing-library/react";
import { ActiveLink } from "../components/ActiveLink";

afterEach(() => {
  cleanup();
});

test("renders link correctly", () => {
  const { getByText } = render(<ActiveLink href="test">Test</ActiveLink>);
  const link = getByText("Test");

  expect(link.getAttribute("href")).toBe("/test");
});
