import * as yup from 'yup'

export const changePassword = yup.object().shape({
    currentPassword : yup.string().required("Required"),
    newPassword : yup.string().required('Required'),
    repeatPassword : yup.string().required('Required').oneOf([yup.ref("newPassword"), null], "Passwords must match")
})