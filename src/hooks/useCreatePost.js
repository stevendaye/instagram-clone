import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { useLocation } from "react-router-dom";

const useCreatePost = () => {
  const authUser = useAuthStore((state) => state.user);
  const { createPost } = usePostStore();
  const addPost = useUserProfileStore((state) => state.addPost);
  const [isLoading, setIsLoading] = useState();
  const showToast = useShowToast();
  // const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");

    setIsLoading(true);
    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uuid,
    };

    try {
      // Create new model: posts
      const postsModel = await addDoc(collection(firestore, "posts"), newPost);
      const usersModel = doc(firestore, "users", authUser.uuid);

      // Store the image with a reference
      const imageRef = ref(storage, `posts/${postsModel.id}`);
      await updateDoc(usersModel, { posts: arrayUnion(postsModel.id) });
      await uploadString(imageRef, selectedFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postsModel, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;
      createPost({ ...newPost, id: postsModel.id });
      addPost({ ...newPost, id: postsModel.id });

      showToast("Success", "Post Created Successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
