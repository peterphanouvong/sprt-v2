import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  useCreateQuickEventMutation,
  useUploadImageMutation,
} from "../generated/graphql";
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

  const [, createQuickEvent] = useCreateQuickEventMutation();

  // const [, uploadImage] = useUploadImageMutation();

  const processLogoImage = () => {
    //@ts-ignore
    const file = document.getElementById("Logo").files[0];
    console.log(file);
    // uploadImage(file);
    setLogoFile(file);
  };

  // const onDrop = useCallback((acceptedFiles) => {
  //   console.log(acceptedFiles);
  //   uploadImage(acceptedFiles);
  //   // Do something with the files
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          console.log(logoFile);

          const { error, data } = await createQuickEvent({
            createQuickEventInput: {
              ...values,
              description: JSON.stringify(values.description),
              logoImage: logoFile,
            },
          });

          // onDrop(logoFile);

          if (error) {
            toast({
              description: error.message.substr(10),
              isClosable: true,
              position: "top",
              status: "error",
              variant: "subtle",
            });
          } else {
            localStorage.setItem(`my-${data?.createQuickEvent.id}`, "true");
            router.push(`/quick-event/${data?.createQuickEvent.id}`);
          }
        }}
      >
        {(props) => (
          <Form>
            {/* {console.log(props)} */}
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

              {/* <TextareaField label="Description" name="description" /> */}
              <DynamicEditor
                label='Description'
                setFieldValue={props.setFieldValue}
                name='description'
                initialValue={props.values.description}
              />

              {/* <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => console.log("Files:", files)}
            /> */}

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
                  // onInput={() => console.log("input")}
                />
                {/* <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div> */}
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>

              {/* <InputGroup onClick={() => console.log("test")}>
              <input type={"file"} hidden />
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </InputGroup> */}

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
