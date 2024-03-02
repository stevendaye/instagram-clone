import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useUserProfileStore from "../store/useUserProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollow = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    try {
      setIsUpdating(true);
      const authUserRef = doc(firestore, "users", user.uuid);
      const followedUser = doc(firestore, "users", userId);

      await updateDoc(authUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(followedUser, {
        followers: isFollowing ? arrayRemove(user.uuid) : arrayUnion(user.uuid),
      });

      // Unfollow
      if (isFollowing) {
        setUser({
          ...user,
          following: user.following.filter((uuid) => uuid !== userId),
        });

        setUserProfile({
          ...userProfile,
          followers: userProfile.followers.filter((uuid) => uuid !== user.uuid),
        });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...user,
            following: user.following.filter((uuid) => uuid !== userId),
          })
        );
        setIsFollowing(false);
        return;
      }

      // Follow
      setUser({
        ...user,
        following: [...user.following, userId],
      });

      setUserProfile({
        ...userProfile,
        followers: [...userProfile.followers, user.uuid],
      });

      localStorage.setItem(
        "user-info",
        JSON.stringify({
          following: [...user.following, userId],
        })
      );
      setIsFollowing(true);
    } catch (err) {
      showToast("Error", err.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollow;
