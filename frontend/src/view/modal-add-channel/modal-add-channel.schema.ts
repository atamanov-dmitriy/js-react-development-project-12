import type { TFunction } from "i18next";
import * as yup from "yup";
import type { Channel } from "../../model/channels/channels.types";

const InputLength = {
  MIN: 3,
  MAX: 20,
};

const createValidationSchema = (
  t: TFunction<"translation", undefined>,
  channels?: Channel[],
) =>
  yup.object({
    name: yup
      .string()
      .required(t("page-index.addForm.required"))
      .test(
        "len",
        t("page-index.addForm.minMax", {
          min: InputLength.MIN,
          max: InputLength.MAX,
        }),
        (value) =>
          value.length >= InputLength.MIN && value.length <= InputLength.MAX,
      )
      .notOneOf(
        channels ? channels.map(({ name }) => name) : [],
        t("page-index.addForm.notOneOf"),
      ),
  });

export { InputLength, createValidationSchema };
