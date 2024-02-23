import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
    name: Yup.string().required("Lütfen bu alanı doldurunuz."),
    linkurl: Yup.string().url("Lütfen geçerli bir url giriniz.").required("Lütfen bu alanı doldurunuz."),
  });