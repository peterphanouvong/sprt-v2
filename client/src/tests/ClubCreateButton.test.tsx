import { render, cleanup } from "@testing-library/react";
import { ClubCreateButton } from "../components/ClubCreateButton";
import userEvent from "@testing-library/user-event";
import { never } from "wonka";
import { Provider } from "urql";

afterEach(() => {
  cleanup();
});

const mockClient = {
  executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};

const ProviderClubCreateButton = () => (
  //@ts-ignore
  <Provider value={mockClient}>
    <ClubCreateButton />
  </Provider>
);

test("renders the correct content", () => {
  const { getByText } = render(<ClubCreateButton />);
  expect(getByText("Create a club")).not.toBeNull();
});

test("opens modal on click", () => {
  const { getByText } = render(<ProviderClubCreateButton />);
  const button = getByText("Create a club");
  userEvent.click(button);

  getByText("Create Club");
});
