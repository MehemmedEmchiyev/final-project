import { useFormik } from 'formik';
import { useState } from 'react';
import { paymentSchema } from '../../../../validation/paymentSchema';
import ReactInputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';
import { changeValid } from '../../../../store/paymentSlice';
import toast from 'react-hot-toast';
import Loader from '../../../ui/Loader';

export default function PaymentMethods() {

    const [selectedMethod, setSelectedMethod] = useState('');
    const [savePayment, setSavePayment] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            cardNumber: '',
            nameOfCard: '',
            expration: '',
            cvv: ''
        },
        validationSchema: paymentSchema,
        onSubmit: () => {
            setIsLoading(true)
            setTimeout(() => {
                dispatch(changeValid(true))
                resetForm()
                toast.success('Credit card added')
                setIsLoading(false)
            },1500)
        }
    })
    return (
        <div className="w-full mx-auto h-max">
            <div className='bg-white'>
                <div className="py-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">OTHER PAYMENT METHODS</h2>
                    <div className={`border-2 rounded-lg mb-4 ${selectedMethod === 'credit' ? 'border-blue-400' : 'border-gray-200'}`}>
                        <div
                            className={`flex items-center p-4 rounded-t-lg cursor-pointer ${selectedMethod === 'credit' ? 'bg-blue-50' : 'bg-gray-50'}`}
                            onClick={() => setSelectedMethod('credit')}
                        >
                            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${selectedMethod === 'credit' ? 'bg-blue-500' : 'border-2 border-gray-300'}`}>
                                {selectedMethod === 'credit' && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="w-12 h-8 bg-gray-800 rounded mr-3 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M0 4v16h24V4H0zm22 14H2V6h20v12zM6 8H4v2h2V8zm0 3H4v2h2v-2zm0 3H4v2h2v-2zm14-6H8v2h12V8zm0 3H8v2h12v-2zm0 3H8v2h12v-2z" />
                                </svg>
                            </div>
                            <span className="text-gray-800 font-medium">Credit Card / Debit Card</span>
                        </div>

                        {selectedMethod === 'credit' && (
                            <form className="p-6" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-semibold text-gray-700">CARD DETAILS</h3>
                                        <div className="flex space-x-2">
                                            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">JCB</div>
                                            <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                                            <div className="w-8 h-5 bg-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                                            <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold text-[10px]">AMEX</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">
                                                Card Number <span className="text-orange-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={values.cardNumber}
                                                name='cardNumber'
                                                onChange={handleChange}
                                            />
                                            {errors.cardNumber && <p className='text-red-500'>{errors.cardNumber}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">
                                                Name on card <span className="text-orange-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={values.nameOfCard}
                                                name='nameOfCard'
                                                onChange={handleChange}
                                            />
                                            {errors.nameOfCard && <p className='text-red-500'>{errors.nameOfCard}</p>}

                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">
                                                    Expiration <span className="text-orange-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    value={values.expration}
                                                    name='expration'
                                                    onChange={handleChange}
                                                />
                                                {errors.expration && <p className='text-red-500'>{errors.expration}</p>}

                                            </div>

                                            <div>
                                                <label className=" text-sm text-gray-600 mb-1 flex items-center">
                                                    CVV <span className="text-orange-500">*</span>
                                                    <svg className="ml-2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" />
                                                    </svg>
                                                </label>
                                                <input
                                                    name="cvv"
                                                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    value={values.cvv}
                                                    onChange={handleChange}
                                                    placeholder='Enter PIN' />

                                                {errors.cvv && <p className='text-red-500'>{errors.cvv}</p>}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-3">
                                        <span className="text-orange-500">*</span> Required: Save this payment method for future purchases?
                                    </p>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="savePayment"
                                                checked={savePayment === true}
                                                onChange={() => setSavePayment(true)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="savePayment"
                                                checked={savePayment === false}
                                                onChange={() => setSavePayment(false)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 leading-relaxed">
                                    By choosing to save your payment information, this payment method will be selected as the default
                                    for all purchases made using Epic Games Launcher, including purchases in Fortnite, Rocket League,
                                    Fall Guys and the Epic Games Store. You can delete your saved payment information anytime on this
                                    payment screen or by logging in to your Epic Games account, and selecting payment management in
                                    your account settings. <a href="#" className="text-blue-600 underline">Learn more</a>.
                                </div>
                                <button type='submit' className='w-full  h-full bg-blue-400 text-white font-semibold py-2 rounded-md cursor-pointer'>
                                    {
                                        isLoading ? <Loader /> : "Confirm"
                                    }

                                </button>
                            </form>
                        )}
                    </div>

                    <div className={`border-2 rounded-lg ${selectedMethod === 'paypal' ? 'border-blue-400' : 'border-gray-200'}`}>
                        <div
                            className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedMethod === 'paypal' ? 'bg-blue-50' : 'bg-gray-50'}`}
                            onClick={() => setSelectedMethod('paypal')}
                        >
                            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${selectedMethod === 'paypal' ? 'bg-blue-500' : 'border-2 border-gray-300'}`}>
                                {selectedMethod === 'paypal' && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="w-12 h-8 bg-blue-600 rounded mr-3 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-.168 1.06-.39 2.47a.641.641 0 0 1-.633.515l-.026.062zm.806-10.517c.27 0 .484-.26.484-.581 0-.586-.419-.766-.953-.766H5.549l-.364 2.347h1.697zm4.61-7.903H10.51c-.41 0-.806.23-.992.612L8.418 5.83c-.186.383-.592.612-1.002.612H5.549c-.524 0-.968.382-1.05.9L3.430 11.295c-.082.518.186.934.705.934h2.19c.27 0 .484.26.484.581 0 .586.419.766.953.766h1.264l.364-2.347h-1.697c-.27 0-.484.26-.484.581 0 .586.419.766.953.766h1.264l.364-2.347h-1.697c-.27 0-.484.26-.484.581 0 .586.419.766.953.766h1.264l.364-2.347h-1.697c-.27 0-.484.26-.484.581 0 .586.419.766.953.766h1.264l.608-3.924c.082-.518-.186-.934-.705-.934z" />
                                </svg>
                            </div>
                            <span className="text-gray-800 font-medium">PayPal</span>
                        </div>

                        {selectedMethod === 'paypal' && (
                            <div className="p-6">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-3">
                                        <span className="text-orange-500">*</span> Required: Save this payment method for future purchases?
                                    </p>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="savePaymentPaypal"
                                                checked={savePayment === true}
                                                onChange={() => setSavePayment(true)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="savePaymentPaypal"
                                                checked={savePayment === false}
                                                onChange={() => setSavePayment(false)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 leading-relaxed mb-4">
                                    By choosing to save your payment information, this payment method will be selected as the default
                                    for all purchases made using Epic Games payment, including purchases in Fortnite, Rocket League,
                                    Fall Guys and the Epic Games Store. You can delete your saved payment information anytime on this
                                    payment screen or by logging in to your Epic Games account, and selecting payment management in
                                    your account settings. <a href="#" className="text-blue-600 underline">Learn more</a>.
                                </div>

                                <div className="text-xs text-gray-500">
                                    For more information about PayPal, visit <a href="#" className="text-blue-600 underline">PayPal's official website</a>.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}