import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Progress,
  Stack,
  Text
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaArrowUp, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/ui/PostCard";
import {
  GetPaginatedPostsDocument,
  GetPaginatedPostsQuery
} from "../../generated";

export const MainDashboardPage = () => {
  const { data, fetchMore, loading } = useQuery<GetPaginatedPostsQuery>(
    GetPaginatedPostsDocument,
    {
      variables: {
        limit: 5,
        cursor: null
      }
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const scrollToTarget = useRef<HTMLDivElement>(null);
  const scrollUp = () => {
    scrollToTarget.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box mt="20px" px="20px" pb="30px">
        <Box ref={scrollToTarget} position="absolute" top="0"></Box>
        <Center>
          <Progress
            mt="30px"
            size="xs"
            isIndeterminate
            width="100%"
            maxWidth="300px"
          />
        </Center>
      </Box>
    );
  }

  return (
    <Box mt="20px" px="20px" pb="30px">
      <Box ref={scrollToTarget} position="absolute" top="0"></Box>
      <Box ml="10px">
        <Text fontSize="xl" fontWeight="semibold">
          What is on your mind?
        </Text>
        <Button
          mt="5px"
          aria-label="add-post"
          leftIcon={<Icon as={FaPlusCircle} />}
          colorScheme="pink"
          onClick={() => navigate("createPost")}
        >
          Add a post
        </Button>
      </Box>

      <Center mt="30px">
        <Stack align="center" w="100%" spacing={6}>
          {data?.getPaginatedPosts.posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </Stack>
      </Center>

      {data?.getPaginatedPosts.hasMore && (
        <Center mt="25px">
          <Button
            colorScheme="pink"
            onClick={async () => {
              setIsLoading(true);
              await fetchMore({
                variables: {
                  limit: 10,
                  cursor:
                    data?.getPaginatedPosts.posts[
                      data?.getPaginatedPosts.posts.length - 1
                    ].createdAt
                }
              });
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            Load more...
          </Button>
        </Center>
      )}
      <IconButton
        position="fixed"
        bottom="30px"
        right="30px"
        size="lg"
        fontSize="30px"
        aria-label="scroll-up"
        colorScheme="pink"
        icon={<Icon as={FaArrowUp} />}
        onClick={() => scrollUp()}
      />
    </Box>
  );
};
