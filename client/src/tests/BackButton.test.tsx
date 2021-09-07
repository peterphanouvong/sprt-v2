import { shallow } from "enzyme";
import { BackButton } from "../components/BackButton";

test("BackButton Snapshot", () => {
  expect(shallow(<BackButton />)).toMatchSnapshot();
});
