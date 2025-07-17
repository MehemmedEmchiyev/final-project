import * as yup from 'yup'

export const loginschema = yup.object().shape({
    email : yup.string().required("Required").email("Invalid Email"),
    password : yup.string().required('Required')
})