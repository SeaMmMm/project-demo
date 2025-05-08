import { useToast } from "@/hooks/use-toast";
import { createContext, useContext } from "react";

const Context = createContext();

const LyricsContext = ({ value, children }) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);

export const useLyricsContext = () => {
  const value = useContext(Context);
  const { toast } = useToast();

  if (!value) {
    toast({
      title: `Should be used in LyricsContext`,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    return;
  }

  return value;
};

export default LyricsContext;
