import { shallow } from "enzyme";
import { Card } from "../components/Card";

test("Card snapshot", () => {
  expect(shallow(<Card>Hiya</Card>)).toMatchSnapshot();
});
