import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useUserProfileStore from "../store/useUserProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";

const useGetFeedPosts = () => {
  const authUser = useAuthStore((state) => state.user);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const { posts, setPosts } = usePostStore();
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);

      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }

      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "in", authUser.following)
        );
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    authUser && getFeedPosts();
  }, [showToast, setPosts, authUser, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
