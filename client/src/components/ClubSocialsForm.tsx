import { EmailIcon } from "@chakra-ui/icons";
import { VStack, ModalFooter, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { Club } from "../generated/graphql";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import * as Yup from "yup";

interface Props {
  club: Club;
}

const ClubSocialsForm: React.FC<Props> = ({ club }) => {
  const ClubSocialsSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email cannot be blank!"),
    name: Yup.string()
      .min(1, "Club name is too short!")
      .max(50, "Club name is too long!")
      .required("Name cannot be blank!"),
  });
  return (
    <Formik
      initialValues={
        club
          ? {
              name: club.name,
              description: club.description,
              email: club.email,
            }
          : {
              name: "",
              description: "",
              email: "",
            }
      }
      validationSchema={ClubSocialsSchema}
      onSubmit={(values, { setErrors }) => console.log(values, setErrors)}
    >
      {(props) => {
        return (
          <Form>
            <VStack align='stretch' spacing={4} padding={4}>
              <InputField
                name='name'
                placeholder='the Lakers'
                label='Name'
                touched={props.touched.name as boolean}
                required
              />

              <InputField
                name='email'
                placeholder='example@example.com'
                label='Email'
                icon={<EmailIcon color='gray.300' />}
                touched={props.touched.email as boolean}
                required
              />

              <TextareaField
                name='description'
                placeholder='you can thank us for Kobe & Shaq'
                label='Description'
              />
            </VStack>

            <ModalFooter>
              <Button isLoading={props.isSubmitting} type='submit'>
                Save
              </Button>
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export { ClubSocialsForm };
