import React from "react";
import { useState } from "react";

interface IContext {
  selectedTag: "clubs" | "events";
  setSelectedTag: (tag: "clubs" | "events") => void;
}
const ExploreContext = React.createContext<IContext>({
  selectedTag: "clubs",
  setSelectedTag: () => {},
});

interface Props {}

const ExploreProvider: React.FC<Props> = ({ children }) => {
  const [selectedTag, _setSelectedTag] = useState<"clubs" | "events">("clubs");

  const setSelectedTag = (tag: "clubs" | "events") => {
    _setSelectedTag(tag);
  };

  return (
    <ExploreContext.Provider
      value={{
        selectedTag,
        setSelectedTag,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export { ExploreProvider, ExploreContext };
