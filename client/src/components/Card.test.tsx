import { shallow } from "enzyme";
import { Card } from "./Card";

test("Card snapshot", () => {
  expect(shallow(<Card>Hiya</Card>)).toMatchSnapshot();
});
