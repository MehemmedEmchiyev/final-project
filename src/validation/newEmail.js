import * as yup from "yup"

export const newEmail = yup.object().shape({
    email : yup.string().email("Please enter a valid email address").required("The New email address field is required")
})