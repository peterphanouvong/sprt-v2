import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { VStack, ModalFooter, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { errorMessageToObject } from "../utils/errorMessageToObject";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import * as Yup from "yup";
import {
  Club,
  useCreateClubMutation,
  useUpdateClubMutation,
} from "../generated/graphql";

interface Props {
  club?: Club;
  onClose: () => void;
  formType: string;
}

const ClubForm: React.FC<Props> = ({ club, onClose, formType }) => {
  const [, createClub] = useCreateClubMutation();
  const [, updateClub] = useUpdateClubMutation();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const CreateClubSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email cannot be blank!"),
    name: Yup.string()
      .min(1, "Club name is too short!")
      .max(50, "Club name is too long!")
      .required("Name cannot be blank!"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number cannot be blank!"),
  });

  const onCreate = async (values, setErrors) => {
    console.log(values);
    const { data, error } = await createClub({ input: values });
    console.log(data);
    console.log(error);
    if (!error) {
      onClose();
      // addClub(data.createClub);
    } else {
      setErrors(errorMessageToObject(error.message));
    }
  };

  const onEdit = async (values, setErrors) => {
    console.log(values);
    const { data, error } = await updateClub({
      input: { ...values },
      clubId: club.id,
    });
    console.log(data);
    if (!error) {
      onClose();
      // addClub(data.createClub);
    } else {
      setErrors(errorMessageToObject(error.message));
    }
  };

  return (
    <Formik
      initialValues={
        club
          ? {
              name: club.name,
              description: club.description,
              email: club.email,
              phoneNumber: club.phoneNumber,
            }
          : {
              name: "",
              description: "",
              email: "",
              phoneNumber: "",
            }
      }
      validationSchema={CreateClubSchema}
      onSubmit={
        formType === "Post"
          ? (values, { setErrors }) => onCreate(values, setErrors)
          : (values, { setErrors }) => onEdit(values, setErrors)
      }
    >
      {(props) => {
        return (
          <Form>
            <VStack align='stretch' spacing={4} padding={4}>
              <InputField
                name='name'
                placeholder="What's your club name?"
                label='Name'
              />

              <InputField
                name='email'
                placeholder='example@email.com'
                label='Email'
                icon={<EmailIcon color='gray.300' />}
              />

              <InputField
                name='phoneNumber'
                placeholder='04XXXXXXXX'
                label='Phone Number'
                icon={<PhoneIcon color='gray.300' />}
              />

              <TextareaField
                name='description'
                placeholder="What's up?"
                label='Description'
              />
            </VStack>

            <ModalFooter>
              <Button
                colorScheme='orange'
                variant='ghost'
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                colorScheme='orange'
                isLoading={props.isSubmitting}
                type='submit'
              >
                {formType}
              </Button>
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export { ClubForm };
