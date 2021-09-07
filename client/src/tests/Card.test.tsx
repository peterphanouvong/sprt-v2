import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import { Card } from "../components/Card";

test("Card snapshot", () => {
  expect(shallow(<Card>Hiya</Card>)).toMatchSnapshot();
});

test("it renders children", () => {
  const { getByText } = render(<Card>test</Card>);
  expect(getByText("test")).not.toBeNull();
});

test("it includes onclick fn", () => {
  const { getByText } = render(<Card onClick={() => {}}>test</Card>);
  const children = getByText("test");

  expect(children.onclick).not.toBeNull();
});
