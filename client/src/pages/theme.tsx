import { Box, Divider, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Theme: React.FC<Props> = ({}) => {
  return (
    <Box p={8}>
      <VStack alignItems="left">
        <TextBox title={"Heading 01"}>
          <HeadingContent name="Heading 01" variant="h1" />
        </TextBox>
        <TextBox title={"Heading 02"}>
          <HeadingContent name="Heading 02" variant="h2" />
        </TextBox>
        <TextBox title={"Heading 03"}>
          <HeadingContent name="Heading 03" variant="h3" />
        </TextBox>
        <TextBox title={"Heading 04"}>
          <HeadingContent name="Heading 04" variant="h4" />
        </TextBox>
        <TextBox title={"Heading 05"}>
          <HeadingContent name="Heading 05" variant="h5" />
        </TextBox>
        <TextBox title={"Heading 06"}>
          <HeadingContent name="Heading 06" variant="h6" />
        </TextBox>

        <TextBox title={"Caption"}>
          <TextContent variant="caption" />
        </TextBox>

        <TextBox title={"Label"}>
          <TextContent variant="label" />
        </TextBox>

        <TextBox title={"Body 01"}>
          <TextContent variant="body-1" />
        </TextBox>
        <TextBox title={"Body 02"}>
          <TextContent variant="body-2" />
        </TextBox>
        <TextBox title={"Body 03"}>
          <TextContent variant="body-3" />
        </TextBox>

        <TextBox title={"Meta"}>
          <TextContent variant="meta" />
        </TextBox>

        <TextBox title={"Footer"}>
          <TextContent variant="footer" />
        </TextBox>
      </VStack>
    </Box>
  );
};

interface TextBoxProps {
  title: string;
}
const TextBox: React.FC<TextBoxProps> = ({ title, children }) => {
  return (
    <Box>
      <Text variant="label">{title}</Text>
      <Divider mb={6} />
      <Box paddingBottom={6}>{children}</Box>
    </Box>
  );
};

const TextContent: React.FC<{ variant: string }> = ({ variant }) => {
  return (
    <Grid gridTemplateColumns={"1fr 1fr 1fr"} gridColumnGap={6}>
      <Text variant={variant} maxW="65%">
        Keep throwing shit at the wall until something sticks. I think you'll
        find that if you stay consistent, persistence pays off.
      </Text>
      <Text variant={variant} fontWeight="bold" maxW="65%">
        Keep throwing shit at the wall until something sticks. I think you'll
        find that if you stay consistent, persistence pays off.
      </Text>
      <Text variant={variant} textDecoration="underline" maxW="65%">
        Keep throwing shit at the wall until something sticks. I think you'll
        find that if you stay consistent, persistence pays off.
      </Text>
    </Grid>
  );
};

const HeadingContent: React.FC<{ variant: string; name: string }> = ({
  variant,
  name,
}) => {
  return (
    <Grid gridTemplateColumns={"1fr 1fr 1fr"} gridColumnGap={6}>
      <Heading variant={variant} fontWeight="semibold">
        {name}
        <br />
        Semi Bold
      </Heading>
      <Heading variant={variant} fontWeight="bold">
        {name}
        <br />
        Bold
      </Heading>
      <Heading variant={variant} fontWeight="extrabold">
        {name}
        <br />
        Extra Bold
      </Heading>
    </Grid>
  );
};

export default Theme;
