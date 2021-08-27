import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Button, ModalFooter, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import {
  Club,
  useCreateClubMutation,
  useUpdateClubMutation,
} from "../generated/graphql";
import { errorMessageToObject } from "../utils/errorMessageToObject";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  club?: Club;
  onClose: () => void;
  formType: string;
}

const ClubForm: React.FC<Props> = ({ club, onClose, formType }) => {
  const [, createClub] = useCreateClubMutation();
  const [, updateClub] = useUpdateClubMutation();

  const router = useRouter();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    const { error } = await createClub({ input: values });
    if (!error) {
      onClose();
      router.reload();
    } else {
      setErrors(errorMessageToObject(error.message));
    }
  };

  const onEdit = async (values, setErrors) => {
    const { error } = await updateClub({
      input: { ...values },
      clubId: club!.id,
    });
    if (!error) {
      onClose();
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
        formType === "Create club"
          ? (values, { setErrors }) => onCreate(values, setErrors)
          : (values, { setErrors }) => onEdit(values, setErrors)
      }
    >
      {(props) => {
        return (
          <Form>
            <VStack align="stretch" spacing={4} padding={4}>
              <InputField
                name="name"
                placeholder="the Lakers"
                label="Name"
                touched={props.touched.name as boolean}
                required
              />

              <InputField
                name="email"
                placeholder="example@example.com"
                label="Email"
                icon={<EmailIcon color="gray.300" />}
                touched={props.touched.email as boolean}
                required
              />

              <InputField
                name="phoneNumber"
                placeholder="0000000000"
                type="tel"
                label="Phone Number"
                icon={<PhoneIcon color="gray.300" />}
                touched={props.touched.phoneNumber as boolean}
                required
              />

              <TextareaField
                name="description"
                placeholder="you can thank us for Kobe & Shaq"
                label="Description"
              />
            </VStack>

            <ModalFooter>
              <Button
                colorScheme="brand"
                variant="ghost"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                colorScheme="brand"
                isLoading={props.isSubmitting}
                type="submit"
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
