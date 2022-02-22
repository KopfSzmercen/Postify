import { Box, Button, SimpleGrid, Text, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo";
import people from "../images/people.svg";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Box minHeight="100vh">
      <Flex
        justifyContent="space-between"
        flexDir={["column", "row"]}
        p={["15px 30px", "5px 30px"]}
        w="100%"
        bg="blackAlpha.800"
      >
        <Logo />
        <Box mt={["0px", "17px"]}>
          <Button colorScheme="yellow" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button
            colorScheme="yellow"
            ml="20px"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Flex>

      <Box p="15px 30px">
        <SimpleGrid columns={[1, 2]} spacing={[15, 10]} mt="20px">
          <Box>
            <Text fontSize="3xl" fontWeight="semibold">
              Do You find Facebook obsolete?
            </Text>
            <Text mt="10px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              iusto provident pariatur impedit reiciendis? Facilis obcaecati
              officia necessitatibus! Quam, ab. Asperiores necessitatibus
              voluptates earum nihil adipisci, cumque vitae ipsum blanditiis?
            </Text>

            <Text fontSize="xl" mt="15px" fontWeight="semibold">
              Try Postify!
            </Text>
            <Text mt="8px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem optio sit laboriosam maxime consectetur inventore
              ipsam molestiae, quaerat recusandae distinctio?
            </Text>
          </Box>

          <Box>
            <Image src={people}></Image>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MainPage;
