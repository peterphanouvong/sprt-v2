import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateQuickEventMutation } from "../generated/graphql";
import { parseRichText } from "../utils/parseRichText";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { DynamicEditor } from "./DynamicEditor";
import { InputField } from "./InputField";

// import { DropzoneArea } from "material-ui-dropzone";

interface Props {}

const QuickEventForm: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();
  const toast = useToast();
  const router = useRouter();

  const [logoFile, setLogoFile] = React.useState<File>();
  const [bannerFile, setBannerFile] = React.useState<File>();

  const [, createQuickEvent] = useCreateQuickEventMutation();

  const processLogoImage = () => {
    //@ts-ignore
    const file = document.getElementById("Logo").files[0];
    console.log(file);
    // uploadImage(file);
    setLogoFile(file);
  };

  const processBannerImage = () => {
    //@ts-ignore
    const file = document.getElementById("Banner").files[0];
    console.log(file);
    setBannerFile(file);
  };

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: parseRichText(""),
          capacity: undefined,
        }}
        onSubmit={async (values) => {
          console.log(values);

          const { error, data } = await createQuickEvent({
            createQuickEventInput: {
              ...values,
              description: JSON.stringify(values.description),
              logoImage: logoFile,
              bannerImage: bannerFile,
            },
          });

          if (error) {
            toast({
              description: error.message.substr(10),
              isClosable: true,
              position: "top",
              status: "error",
              variant: "subtle",
            });
          } else {
            // localStorage.setItem(`my-${data?.createQuickEvent.id}`, "true");
            router.push(`/quick-event/${data?.createQuickEvent.id}`);
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} mt={8} alignItems='stretch'>
              <InputField
                label='Title'
                name='title'
                touched={props.touched.title as boolean}
                required
              />

              <InputField
                label='Capacity'
                name='capacity'
                touched={props.touched.capacity as boolean}
                type='number'
                width={20}
              />

              <DynamicEditor
                label='Description'
                setFieldValue={props.setFieldValue}
                name='description'
                initialValue={props.values.description}
              />

              <FormControl id='Logo' label='Logo'>
                <FormLabel>
                  <HStack>
                    <Text>Logo Upload</Text>
                    <Text variant='meta'>(optional)</Text>
                  </HStack>
                </FormLabel>
                <Input
                  variant='unstyled'
                  type='file'
                  accept='image/*'
                  onChange={processLogoImage}
                />
              </FormControl>

              <FormControl id='Banner' label='Banner'>
                <FormLabel>
                  <HStack>
                    <Text>Banner Upload</Text>
                    <Text variant='meta'>(optional)</Text>
                  </HStack>
                </FormLabel>
                <Input
                  variant='unstyled'
                  type='file'
                  accept='image/*'
                  onChange={processBannerImage}
                />
              </FormControl>

              <Button
                isLoading={props.isSubmitting}
                size={isMobile ? "md" : "lg"}
                type='submit'
              >
                Create event!
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { QuickEventForm };
