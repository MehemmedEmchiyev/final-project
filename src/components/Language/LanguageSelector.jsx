import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

function LanguageSelector() {
    const [selected, setSelected] = useState('en')
    const [flag , setFlag ] = useState(false)
    const triggerTranslate = (lang) => {
        const googleCombo = document.querySelector(".goog-te-combo");
        if (googleCombo) {
            googleCombo.value = lang;
            googleCombo.dispatchEvent(new Event("change"));
        }
    };
    const handleChange = (code) => {
        triggerTranslate(code)
        setSelected(code)
        setFlag(false)
    }
    const languages = [
        { code: "tr", label: "Türkçe" },
        { code: "en", label: "English" },
        { code: "de", label: "Deutsch" },
        { code: "ru", label: "Русский" },
        { code: "fr", label: "Français" },
    ];

    return (
        <div className='relative ' >
            <MdLanguage onClick={() => setFlag(!flag)} className="cursor-pointer text-white text-2xl" />
            <ul className={` absolute right-full top-full py-3 px-1 w-54 rounded-xl shadow-lg bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white z-50000 ${flag ? "block" : "hidden"}`}>
                {
                    languages?.map((item, index) => <li key={index} onClick={() => handleChange(item.code)} className="py-2 px-2 flex items-center gap-3 rounded-xl justify-between cursor-pointer text-[17px] hover:bg-[#5D5D60]">
                        <span>{item.label}</span>
                        {selected == item.code && <IoCheckmark />}
                    </li>)
                }
            </ul>
        </div>
    );
}

export default LanguageSelector;
