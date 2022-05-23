import * as yup from "yup";

const RegistrationVS = yup.object().shape({
  username: yup
    .string()
    .required("Username is Required")
    .min(4, "Username Too Short")
    .label("username"),
  firstname: yup.string().required("Firstname is Required").label("firstname"),
  lastname: yup.string().required("Lastname is Required").label("lastname"),
});

const EditProfileVS = yup.object().shape({
  firstname: yup.string().required("Firstname is Required").label("firstname"),
  lastname: yup.string().required("Lastname is Required").label("lastname"),
  bio: yup.string().required("Bio is Required").label("bio"),
});

export { RegistrationVS, EditProfileVS };
