import { useState } from "react";

interface FormErrors {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const useFormErrors = () => {
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const resetErrors = () => {
    setErrors({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  return [errors, setErrors, resetErrors] as const;
};

export default useFormErrors;
