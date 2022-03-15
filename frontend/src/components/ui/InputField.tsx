import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Box
} from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let C: any = Input;
  const [field, { error }] = useField(props);
  if (textarea) {
    C = Textarea;
  }
  return (
    <Box p="5px">
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name} fontWeight="semibold">
          {label}
        </FormLabel>
        <C {...field} id={field.name} {...props} value={props.value} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
