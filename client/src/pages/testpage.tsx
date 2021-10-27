import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const testpage: React.FC<Props> = ({}) => {
  return <>test page</>;
};

export default withUrqlClient(createUrqlClient)(testpage);
