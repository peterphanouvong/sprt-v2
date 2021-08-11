import { shallow } from "enzyme";
import { Wrapper } from "./Wrapper";

test("wrapper snapshot", () => {
  expect(shallow(<Wrapper />)).toMatchSnapshot();
});
