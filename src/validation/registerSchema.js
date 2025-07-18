import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    username: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid Email"),
    password: yup.string().required("Required"),
    dateOfBirth: yup.string(),
    country: yup.string().required("Required")
})