import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";

const useCommentPost = () => {
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();

  const commentPost = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uuid,
      postId,
    };

    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(JSON.stringify(newComment)),
      });
      addComment(postId, JSON.stringify(newComment));
    } catch (err) {
      showToast("Error", err.message, "error");
      console.log(err);
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, commentPost };
};

export default useCommentPost;
