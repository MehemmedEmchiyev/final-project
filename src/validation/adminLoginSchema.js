import * as yup from "yup"
 
export const adminLoginSchema = yup.object().shape({
    email : yup.string().email("Invalid Mail").required("Required"),
    password : yup.string().required("Required")
})