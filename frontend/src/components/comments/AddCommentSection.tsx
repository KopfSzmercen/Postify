import { Flex, Icon, IconButton, Textarea } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddCommentSection = () => {
  return (
    <Flex align="center">
      <Textarea placeholder="Add a comment"></Textarea>
      <IconButton
        ml="10px"
        aria-label="add a comment"
        icon={<Icon as={FaPlus} />}
        colorScheme="linkedin"
      />
    </Flex>
  );
};

export default AddCommentSection;
