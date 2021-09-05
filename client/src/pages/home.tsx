import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Input, Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import Select from "react-select";
import Head from "next/head";

interface Props {}

const options = [
  { label: "option", value: "1" },
  { label: "option", value: "2" },
  { label: "option", value: "3" },
  { label: "option", value: "4" },
];
const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <Layout>
      <Head>
        <title>Home | sprt</title>
      </Head>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
      <Select
        placeholder=""
        options={options}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            paddingLeft: "calc(1rem - 4px)",
            height: "calc(2.5rem -4px)",
          }),
        }}
        //@ts-ignore
        theme={(theme) => ({
          ...theme,
          borderRadius: "0.375rem",
          paddingLeft: "1rem",
          colors: {
            ...theme.colors,
            primary75: "#E2E8F0",
            primary50: "#E2E8F0",
            primary25: "#EDF2F7",
            primary: "#3182ce",
            neutral20: "#E2E8F0",
            neutral50: "#A0AEC0",
            neutral40: "#CBD5E0",
            neutral30: "#CBD5E0",
          },
        })}
      />

      <Input placeholder="fuck" mt={3} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
