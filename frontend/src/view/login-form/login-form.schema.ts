import type { TFunction } from "i18next";
import * as yup from "yup";

const UsernameLength = {
  MIN: 3,
  MAX: 20,
};

const PasswordLength = {
  MIN: 4,
};

const createValidationSchema = (t: TFunction<"translation", undefined>) =>
  yup.object({
    username: yup
      .string()
      .test(
        "len",
        t("page-login.usernameMinMax", {
          min: UsernameLength.MIN,
          max: UsernameLength.MAX,
        }),
        (value) =>
          !!(
            value &&
            value.length >= UsernameLength.MIN &&
            value.length <= UsernameLength.MAX
          ),
      )
      .matches(/^[a-zA-Z0-9_]+$/, t("page-login.usernameMatches")),

    password: yup.string().test(
      "len",
      t("page-login.passwordMinMax", {
        min: PasswordLength.MIN,
      }),
      (value) => !!(value && value.length >= PasswordLength.MIN),
    ),
  });

export { createValidationSchema };
