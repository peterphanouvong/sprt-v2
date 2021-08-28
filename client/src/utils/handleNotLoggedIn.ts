import { useToast } from "@chakra-ui/react";

export const handleNotLoggedin = (toast) => {
  toast({
    // title: "Warning",
    variant: "subtle",
    position: "top",
    description: "You need to be logged in to do this!",
    status: "warning",
    duration: 5000,
    isClosable: true,
  });
};
