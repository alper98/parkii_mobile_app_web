import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid"),
  phone: Yup.string().min(0).max(99999999).nullable(true),
});
