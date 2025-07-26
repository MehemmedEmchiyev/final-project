import * as Yup from "yup"

export const paymentSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .matches(/^(\d{4}[- ]?){3}\d{4}$/, 'Invalid credit card number')
        .required('Card number is required'),

    nameOfCard: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Name must only contain letters')
        .required('Name on card is required'),

    expration: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration must be in MM/YY format')
        
        .required('Expiration is required'),

    cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'Invalid format, must be a three or four numeric code')
        .required('CVV is required'),
})