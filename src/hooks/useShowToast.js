import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();

  // useCallback is used here to prevent infinite loop. It also sebved as memoization
  // technique to remenber the last change on to only trigger again if it changes
  // useCallback will prevent the callback function of firing on every render
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: "3000",
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
};

export default useShowToast;
