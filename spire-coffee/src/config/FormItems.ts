import strings from "@/config/strings";

export const LoginFormItems = [
  {
    id: "username",
    label: strings.general.username,
    type: "text",
  },
  {
    id: "password",
    label: strings.general.password,
    type: "password",
  },
];

export const SignUpFormItems = [
  {
    id: "username",
    label: strings.general.username,
    type: "text",
    autoComplete: "username",
  },
  {
    id: "email",
    label: strings.general.email,
    type: "email",
    autoComplete: "email",
  },
  {
    id: "firstName",
    label: strings.general.firstName,
    type: "text",
    autoComplete: "firstName",
  },
  {
    id: "lastName",
    label: strings.general.lastName,
    type: "text",
    autoComplete: "lastName",
  },
  {
    id: "password",
    label: strings.general.password,
    type: "password",
    autoComplete: "password",
  },
  {
    id: "confirmPassword",
    label: strings.login.confirmPassword,
    type: "password",
    autoComplete: "confirmPassword",
  },
];
