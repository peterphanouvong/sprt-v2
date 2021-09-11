import { RegisterForm } from "../components/RegisterForm";
import { render } from "@testing-library/react";
import { never } from "wonka";
import { Provider } from "urql";
import React from "react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockClient = {
  executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};

const ProviderRegisterForm = ({ onSubmit }) => (
  //@ts-ignore
  <Provider value={mockClient}>
    <RegisterForm onSubmit={onSubmit} />
  </Provider>
);

test("First name required check", () => {
  const handleSubmit = jest.fn();
  const { getByRole } = render(
    <ProviderRegisterForm onSubmit={handleSubmit} />
  );
  const firstNameInput = getByRole("textbox", {
    name: /first name/i,
  });

  act(() => {
    userEvent.clear(firstNameInput);
    userEvent.type(firstNameInput, "test");
  });
});
