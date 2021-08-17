import React, { useState, useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import { CustomElement } from "../utils/slateTypes";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // const initialValue: CustomElement = [];

  // const handleChange = (value) => {
  //   setText(value);
  // };
  return (
    <Layout>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable />
      </Slate>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
