import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useVerifyOtpMutation } from '../../../store/services/epicApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function VerifyEmail() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const inputRefs = useRef([]);
    const [verifyEmail] = useVerifyOtpMutation()
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInputChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
                setFocusedIndex(index + 1);
            }
        }
    };
    const { email } = useSelector(store => store.email)
    const navigator = useNavigate()

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
        }
    };
    const handleFocus = (index) => {
        setFocusedIndex(index);
    };
    const verifyOtp = async () => {
        const kod = code.join('')
        const data = {
            "email": email,
            "otpCode": kod
        }

        const res = await verifyEmail(data)
        if (res?.error) toast.error(res?.error.data.message)
        else {
            navigator('/login')
            toast.success(res?.data?.message)
        }
    };
    const handleResendCode = () => {
        console.log('Resend code clicked');
    };

    const handleChangeEmail = () => {
        console.log('Change email clicked');
    };

    const isCodeComplete = code.every(digit => digit !== '');
    return (
        <div className="min-h-screen bg-[#101014] flex items-center justify-center p-4">
            <div className="w-full md:w-[500px] bg-[#18181C] rounded-3xl p-8">
                <button
                    className="flex items-center text-white text-lg font-medium mb-8 hover:text-gray-300 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 mr-2" />
                    Back
                </button>
                <h1 className="text-white text-2xl font-bold mb-8">
                    Check your inbox
                </h1>
                <p className="text-gray-400 text-base mb-8 leading-relaxed">
                    Enter the 6-digit security code we sent to{' '}
                </p>
                <div className="flex gap-3 mb-8">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={() => handleFocus(index)}
                            className={`w-full h-14 text-center text-xl font-semibold bg-[#242428] border-2 rounded-lg text-white transition-all duration-200 ${focusedIndex === index || digit
                                ? 'border-white bg-[#242428]'
                                : 'bg-[#242428]'
                                } `}
                            maxLength="1"
                        />
                    ))}
                </div>

                <button
                    onClick={verifyOtp}
                    disabled={!isCodeComplete}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${isCodeComplete
                        ? 'bg-gray-600 text-white hover:bg-gray-500'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Continue
                </button>
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={handleResendCode}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Resend code
                    </button>
                    <span className="text-gray-500">or</span>
                    <button
                        onClick={handleChangeEmail}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Change email
                    </button>
                </div>
            </div>
        </div>
    );
}