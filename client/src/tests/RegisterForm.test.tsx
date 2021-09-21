import { RegisterForm } from "../components/RegisterForm";
import { fireEvent, render } from "@testing-library/react";
import { never, fromValue } from "wonka";
import { Provider } from "urql";
import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { server } from "./__mocks__/server";

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

test("Required input validation", async () => {
  const promise = Promise.resolve();
  const handleSubmit = jest.fn();
  const { getByRole, findByTestId } = render(
    <ProviderRegisterForm onSubmit={handleSubmit} />
  );

  fireEvent.blur(getByRole("textbox", { name: /first name/i }));
  await findByTestId("firstname-register-form-error");

  fireEvent.blur(getByRole("textbox", { name: /last name/i }));
  await findByTestId("lastname-register-form-error");

  fireEvent.blur(getByRole("textbox", { name: /username/i }));
  await findByTestId("username-register-form-error");

  fireEvent.blur(getByRole("textbox", { name: /email/i }));
  await findByTestId("email-register-form-error");

  await act(() => promise);
});

describe("Email validation", () => {
  test("is valid", async () => {
    const promise = Promise.resolve();
    const handleSubmit = jest.fn();
    const { getByRole, findByText } = render(
      <ProviderRegisterForm onSubmit={handleSubmit} />
    );
    userEvent.type(
      getByRole("textbox", {
        name: /email/i,
      }),
      "bad_email.com"
    );
    fireEvent.blur(
      getByRole("textbox", {
        name: /email/i,
      })
    );
    await findByText(/email is invalid/i);

    await act(() => promise);
  });

  test("is not in use", async () => {
    server.use();
  });
});

test("Password validation", async () => {});

test("Password validation", async () => {});
