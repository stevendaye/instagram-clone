import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import { query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Boilerplate
const useCommentPost = () => {
  const authUser = useAuthStore();
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();

  const commentPost = async (postId) => {
    setIsCommenting(true);

    try {
      const q = query(firestore, "posts", postId);
    } catch (err) {
      showToast("Error", err.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, commentPost };
};

export default useCommentPost;
