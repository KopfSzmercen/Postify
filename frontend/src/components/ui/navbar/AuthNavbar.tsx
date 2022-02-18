import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Icon,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../Logo";
import Links from "./Links";
import { FaArrowCircleRight } from "react-icons/fa";

export default function AuthNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("redner");

  return (
    <>
      <Box bg="blackAlpha.800" p={["15px 30px", "5px 30px"]}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Logo />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Links />
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Icon
                    as={FaArrowCircleRight}
                    fontSize="25px"
                    color="red.300"
                  />
                  <Text ml="15px">Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            display={["flex", "flex", "none"]}
            justifyContent="space-around"
            mt="15px"
          >
            <Stack as={"nav"} spacing={4} maxW="60px">
              <Links />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
