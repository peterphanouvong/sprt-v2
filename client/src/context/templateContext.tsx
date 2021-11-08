import React from "react";
import { useState } from "react";

interface IContext {
  selectedTemplateId: string | undefined;
  setSelectedTemplateId: (arg0: string) => void;
}
const TemplateContext = React.createContext<IContext>({
  selectedTemplateId: undefined,
  setSelectedTemplateId: () => {},
});

interface Props {}

const TemplateProvider: React.FC<Props> = ({ children }) => {
  const [selectedTemplateId, _setSelectedTemplateId] = useState<string>("-1");

  const setSelectedTemplateId = (id: any) => {
    _setSelectedTemplateId(id);
  };

  return (
    <TemplateContext.Provider
      value={{
        selectedTemplateId,
        setSelectedTemplateId,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export { TemplateProvider, TemplateContext };
