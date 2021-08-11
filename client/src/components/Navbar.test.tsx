import { shallow } from "enzyme";
import { Navbar } from "./Navbar";

test("navbar snapshot", () => {
  expect(shallow(<Navbar />)).toMatchSnapshot();
});

test("it shows login & register when not logged in");
test("it shows username & logout when logged in");
