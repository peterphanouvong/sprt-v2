import { cleanup, render } from "@testing-library/react";
import { ClubDeleteButton } from "../components/ClubDeleteButton";
import { never } from "wonka";
import { Provider } from "urql";

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const mockClient = {
  executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};

const ProviderClubCreateButton = () => (
  //@ts-ignore
  <Provider value={mockClient}>
    <ClubDeleteButton clubId={1} />
  </Provider>
);

test("renders", async () => {
  const { getByText } = render(<ProviderClubCreateButton />);
});
