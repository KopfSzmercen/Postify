import { LoginError, RegisterError } from "../generated";

const formatFormErrors = (errors: RegisterError[] | LoginError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};

export default formatFormErrors;
