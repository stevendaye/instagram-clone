import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/useUserProfileStore";

const useGetUserProfile = (username) => {
  const [isLoading, setIsLoading] = useState();
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();
  let userDoc;

  useEffect(() => {
    setIsLoading(true);
    const getUserProfile = async () => {
      try {
        const usersModel = collection(firestore, "users");
        const q = query(usersModel, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);

        querySnapshot.forEach((doc) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
      } catch (err) {
        showToast("Error", err.message, "error");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [username, setUserProfile, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfile;
