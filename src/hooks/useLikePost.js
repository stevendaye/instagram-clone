import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";

const useLikePost = (post) => {
  const authUser = useAuthStore((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const { addLikes } = usePostStore();
  const [likes, setLikes] = useState(post.likes.length);
  const [hasLiked, setHasLiked] = useState(post.likes.includes(authUser.uuid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to like a post");
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: hasLiked
          ? arrayRemove(authUser.uuid)
          : arrayUnion(authUser.uuid),
      });
      setHasLiked(!hasLiked);
      setLikes(hasLiked ? likes - 1 : likes + 1);
      addLikes(post.id, authUser.uuid);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { likes, hasLiked, isUpdating, handleLikePost };
};

export default useLikePost;
