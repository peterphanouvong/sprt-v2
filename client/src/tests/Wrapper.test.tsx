import { shallow } from "enzyme";
import { Wrapper } from "../components/Wrapper";

test("wrapper snapshot", () => {
  expect(shallow(<Wrapper />)).toMatchSnapshot();
});
