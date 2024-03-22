import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

/* Getting User profile Info by id to request its info
 * that will be used on his posted comments
 */
const useGetUserInfo = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const userRef = await getDoc(doc(firestore, "users", id));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, [id, setUserProfile, showToast]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserInfo;
