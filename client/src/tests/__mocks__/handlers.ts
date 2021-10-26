import { graphql } from "msw";

export const handlers = [
  // Handles a "Login" mutation
  graphql.mutation("Register", (req, res, ctx) => {
    const { email } = req.variables;

    console.log(email);

    // if email === "test@test.com"
    return res(
      ctx.data({
        data: {
          register: {
            errors: [
              {
                message: "that email is already in use",
                field: "email",
                __typename: "FieldError",
              },
            ],
            user: null,
            __typename: "UserResponse",
          },
        },
      })
    );
  }),
];
