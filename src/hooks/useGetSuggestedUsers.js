import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);

      try {
        const usersModel = collection(firestore, "users");
        const q = query(
          usersModel,
          where(
            "uuid",
            "not-in",
            [authUser.uuid, ...authUser.following],
            orderBy("uuid"),
            limit(3)
          )
        );
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "Error");
      } finally {
        setIsLoading(false);
      }
    };

    authUser && getSuggestedUsers();
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
