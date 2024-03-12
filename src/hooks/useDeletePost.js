import { useState } from "react";
import useUserProfileStore from "../store/useUserProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

const useDeletePost = () => {
  const authUser = useAuthStore((state) => state.user);
  const { removePost } = useUserProfileStore();
  const deletePost = usePostStore((state) => state.deletePost);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUserPost = async (id) => {
    if (!window.confirm("Are you sure you want delete ")) return;
    try {
      setIsDeleting(true);
      const imageRef = ref(storage, `posts/${id}`);
      await deleteObject(imageRef);
      await deleteDoc(doc(firestore, "posts", id));

      const userRef = doc(firestore, "users", authUser.uuid);
      updateDoc(userRef, {
        posts: arrayRemove(id),
      });

      removePost(id);
      deletePost(id);
      showToast("Success", "Post Deleted Successfully", "success");
    } catch (err) {
      showToast("Error", err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, deleteUserPost };
};

export default useDeletePost;
