import * as yup from 'yup'

export const nameValidation = yup.object().shape({
    name : yup.string().required("New name is required").min(3 , "Please enter a display name that is at least 3 characters.")
})