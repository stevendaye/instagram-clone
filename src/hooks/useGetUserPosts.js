import { useEffect, useState } from "react";
import usePostStore from "../store/usePostStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getUserPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uuid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (err) {
        showToast("Error", err.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getUserPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;
