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
import { useMutation, useReactiveVar } from "@apollo/client";
import { LogoutDocument, LogoutMutation } from "../../../generated";
import { useNavigate } from "react-router-dom";
import { client, myUsernameVar } from "../../..";

export default function AuthNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout] = useMutation<LogoutMutation>(LogoutDocument);
  const navigate = useNavigate();
  const myUsername = useReactiveVar(myUsernameVar);

  return (
    <>
      <Box bg="blackAlpha.800" p={["25px 30px", "15px 30px"]}>
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
                <Box mt="10px">
                  <Avatar size={"md"} name={myUsername} />
                  <Text mt="5px" fontSize="sm" color="whiteAlpha.900">
                    {myUsername}
                  </Text>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem
                  p="5px"
                  onClick={async () => {
                    const response = await logout();
                    if (response.data?.logout) {
                      myUsernameVar("");
                      await client.clearStore();
                      navigate("/", { replace: true });
                    }
                  }}
                >
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
