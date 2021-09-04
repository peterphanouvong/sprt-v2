import { shallow } from "enzyme";
import { ClubCreateButton } from "../components/ClubCreateButton";

test("ClubCreateButton snapshot", () => {
  expect(shallow(<ClubCreateButton />)).toMatchSnapshot();
});
