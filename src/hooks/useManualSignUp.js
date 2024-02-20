import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/useAuthStore";

const useManualSignUp = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signUp = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.fullName ||
      !inputs.username
    ) {
      showToast("Error", "Please all fields are required!", "error");
      return;
    }

    // Check if username already exists
    const usersModel = collection(firestore, "users");
    const q = query(usersModel, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast(
        "Error",
        "This username already exists. Please choose a different one",
        "error"
      );
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userDoc = {
        uuid: newUser.user.uid,
        email: inputs.email,
        fullName: inputs.fullName,
        username: inputs.username,
        bio: "",
        profilePicUrl: "",
        posts: [],
        followers: [],
        following: [],
        createdAt: Date.now(),
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return { error, loading, signUp };
};

export default useManualSignUp;
