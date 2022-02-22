import {
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import useConstant from "use-constant";
import AwesomeDebouncePromise from "awesome-debounce-promise";

const SearchUserInput: React.FC<{ setSearchValue: React.Dispatch<string> }> = ({
  setSearchValue
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const setValueDebounced = useConstant(() =>
    AwesomeDebouncePromise(() => {
      setSearchValue(inputRef.current!.value);
    }, 600)
  );

  return (
    <FormControl
      bg="whiteAlpha.800"
      p="10px"
      borderRadius="10px"
      w="100%"
      maxW="300px"
    >
      <InputGroup>
        <Input
          id="search-user"
          type="text"
          placeholder="Search a user by username"
          ref={inputRef}
          onChange={() => {
            setValueDebounced();
          }}
        />
        <InputRightElement
          children={<Icon as={FaSearch} color="green.500" />}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchUserInput;
