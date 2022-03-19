import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Progress,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetSinglePostDocument,
  GetSinglePostQuery,
  PostFragmentFragment
} from "../../generated";
import CommentsList from "../comments/CommentsList";
import VoteSection from "./VoteSection";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { ImBin2 } from "react-icons/im";
import { currentPostVar } from "../..";

const PostDetailCard = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  if (loading) {
    return (
      <Progress
        mt="30px"
        size="xs"
        isIndeterminate
        width="100%"
        maxWidth="400px"
      />
    );
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

  currentPostVar(post);

  return (
    <Box shadow="lg" borderRadius="5px" w="100%" maxW="600px" bg="white">
      <ConfirmDeleteModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        post={post}
      />
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
            {post.canEdit === "true" && (
              <>
                {" "}
                <IconButton
                  mt="5px"
                  aria-label="edit"
                  icon={<Icon ml="4px" as={FaEdit} />}
                  colorScheme="linkedin"
                  fontSize="25px"
                  onClick={() => navigate(`/dashboard/post/${post.id}/edit`)}
                />
                <IconButton
                  ml="20px"
                  mt="5px"
                  colorScheme="red"
                  aria-label="delete"
                  icon={<Icon as={ImBin2} />}
                  onClick={onOpen}
                />
              </>
            )}
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
