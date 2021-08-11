import { getPage } from "next-page-tester";

test("register page renders", async () => {
  const { render } = await getPage({ route: "/register" });
  render();
});

test("login page renders", async () => {
  const { render } = await getPage({ route: "/login" });
  render();
});

test("index page renders", async () => {
  const { render } = await getPage({ route: "/" });
  render();
});
