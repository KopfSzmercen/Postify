import { useQuery } from "@apollo/client";
import { Box, Center, Progress } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import EditPostForm from "../../components/EditPostForm";
import {
  GetSinglePostDocument,
  GetSinglePostQuery,
  PostFragmentFragment
} from "../../generated";

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useQuery<GetSinglePostQuery>(
    GetSinglePostDocument,
    {
      variables: {
        postId: parseInt(postId!)
      }
    }
  );

  if (loading && !data)
    return (
      <Box mt="30px">
        <Center>
          <Progress size="xs" isIndeterminate />
        </Center>
      </Box>
    );

  if (!loading && !data) {
    navigate("/dashboard");
  }

  const post = data?.getSinglePost.post as PostFragmentFragment;

  return (
    <Box mt="30px">
      <Center>
        <EditPostForm post={post} />
      </Center>
    </Box>
  );
};

export default EditPostPage;
