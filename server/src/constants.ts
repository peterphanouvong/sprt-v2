export const __prod__ = process.env.NODE_ENV === "production";
export const __test__ =
  process.env.NODE_ENV === "test" || process.env.ENV === "test";
export const COOKIE_NAME = "qid";

export const FORGET_PASSWORD_PREFIX = "forget-password:";
