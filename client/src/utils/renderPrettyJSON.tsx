import React from "react";
import { Code } from "@chakra-ui/react";

interface Props {
  object: Object;
}

const RenderPrettyJSON: React.FC<Props> = ({ object }) => {
  return (
    <Code maxW="400px" overflowX="scroll">
      <pre id="json">{JSON.stringify(object, null, 2)}</pre>
    </Code>
  );
};

export { RenderPrettyJSON };
