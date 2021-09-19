import { Container, Heading } from "@chakra-ui/layout";
import {
  Box,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ClubBanner } from "../../../components/ClubBanner";
import { ClubForm } from "../../../components/ClubForm";
import { Layout } from "../../../components/Layout";
import { Card } from "../../../components/Card";
import {
  Club,
  ClubByAdminIdQuery,
  useClubByAdminIdQuery,
} from "../../../generated/graphql";
import nothingHere from "../../../images/nothing-here.svg";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";
import { ClubSocialsForm } from "../../../components/ClubSocialsForm";
import { ClubUploadImagesForm } from "../../../components/ClubUploadImagesForm";

interface Props {}

const edit: React.FC<Props> = ({}) => {
  const router = useRouter();
  const isMobile = useIsMobileScreen();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, error }] = useClubByAdminIdQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  console.log(data);

  if (error?.message === "[GraphQL] Cannot read property 'clubId' of undefined")
    return (
      <Layout>
        <Box textAlign='center'>
          <Text variant='body-2' textAlign='center'>
            Looks like you don't have a club yet
          </Text>
          <br />
          <Image src={nothingHere} width='200px' height='200px' />
        </Box>
      </Layout>
    );

  return (
    <Layout title={data?.clubByAdminId.name}>
      <Head>
        <title>{data?.clubByAdminId.name} | sprt</title>
        <meta name='description' content={data?.clubByAdminId.name} />
      </Head>

      <ClubBanner club={data as ClubByAdminIdQuery} />

      <Container paddingX={4} maxW='container.lg' mb={60}>
        <Heading as='h2' variant='h2' mt={isMobile ? 20 : 28}>
          {/* {"Editing "} */}
          {data?.clubByAdminId.name || (
            <Skeleton height='30px' width='100px'>
              Club name
            </Skeleton>
          )}
        </Heading>

        <Tabs orientation='vertical' mt={4}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Socials</Tab>
            <Tab>Images</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Card>
                <Heading fontSize='large'>Edit Details</Heading>
                <br />
                <ClubForm
                  noClose
                  onClose={() => {}}
                  club={data?.clubByAdminId as Club}
                  formType={"Save"}
                />
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <Heading fontSize='large'>Edit Socials</Heading>
                <br />
                <ClubSocialsForm club={data?.clubByAdminId as Club} />
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <Heading fontSize='large'>Upload Club Images</Heading>
                <br />
                {/* <ClubForm
                  noClose
                  onClose={() => {}}
                  club={data?.clubByAdminId as Club}
                  formType={"Save"}
                /> */}
                <ClubUploadImagesForm club={data as ClubByAdminIdQuery} />
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(edit);
