import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Progress,
  Text
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetSinglePostDocument,
  GetSinglePostQuery,
  PostFragmentFragment
} from "../../generated";
import CommentsList from "../comments/CommentsList";
import VoteSection from "./VoteSection";
import { FaArrowLeft } from "react-icons/fa";

const PostDetailCard = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  if (!postId) {
    navigate("/");
  }

  const { data, loading } = useQuery<GetSinglePostQuery>(
    GetSinglePostDocument,
    {
      variables: {
        postId: parseInt(postId!)
      }
    }
  );

  console.log(data);

  if (loading) {
    if (loading) {
      return (
        <Center>
          <Progress
            mt="30px"
            size="xs"
            isIndeterminate
            width="100%"
            maxWidth="300px"
          />
        </Center>
      );
    }
  }

  if (!data?.getSinglePost.success) {
    //TODO navigate to the error page
  }

  if (data?.getSinglePost.success && !data.getSinglePost.post) {
    return (
      <Center>
        <Heading>Post not found...</Heading>
      </Center>
    );
  }

  if (!data?.getSinglePost.post) {
    return (
      <Center>
        <Heading>Oops... something went wrong. Please try later</Heading>
      </Center>
    );
  }

  const post = data?.getSinglePost.post as PostFragmentFragment;

  const parsedDate = new Date(parseInt(post!.createdAt))
    .toISOString()
    .substring(0, 10);

  return (
    <Box shadow="lg" borderRadius="5px" w="100%" maxW="600px" bg="white">
      <Box p="15px">
        <IconButton
          aria-label="go-back"
          colorScheme="pink"
          icon={<Icon mt="3px" as={FaArrowLeft} fontSize="23px" />}
          display="fixed"
          bottom="0"
          left="7px"
          onClick={() => navigate("/dashboard")}
        />
        <Flex p="5px" dir="column" justify="space-between">
          <Box>
            <Heading>{post?.title}</Heading>
            <Text fontSize="md">{post?.creator.username}</Text>
            <Text fontSize="sm">{parsedDate}</Text>
          </Box>
          <VoteSection post={post} />
        </Flex>
        <Text mt="20px">{post.text}</Text>
      </Box>
      <Box mt="40px" bg="blackAlpha.800" p="10px">
        <Center>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            letterSpacing="1px"
            color="white"
          >
            Comments: {post.commentsNumber}
          </Text>
        </Center>

        <Center mt="15px">
          <CommentsList post={post} />
        </Center>
      </Box>
    </Box>
  );
};

export default PostDetailCard;
