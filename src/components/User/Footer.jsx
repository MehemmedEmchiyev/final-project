import { CgArrowTopLeftO } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useState } from "react";

const socialMedias = [<FaFacebookF />, <FaXTwitter />, <FaYoutube />]
const footerData = [
  {
    title: "Games",
    items: [
      "Fortnite",
      "Fall Guys",
      "Rocket League",
      "Unreal Tournament",
      "Infinity Blade",
      "Shadow Complex",
      "Robo Recall"
    ]
  },
  {
    title: "Marketplaces",
    items: [
      "Epic Games Store",
      "Fab",
      "Sketchfab",
      "ArtStation",
      "Store Refund Policy",
      "Store EULA"
    ]
  },
  {
    title: "Tools",
    items: [
      "Unreal Engine",
      "UEFN",
      "MetaHuman",
      "Twinmotion",
      "Megascans",
      "RealityScan",
      "Rad Game Tools"
    ]
  },
  {
    title: "Online Services",
    items: [
      "Epic Online Services",
      "Kids Web Services",
      "Services Agreement",
      "Acceptable Use Policy",
      "Trust Statement",
      "Subprocessor List"
    ]
  },
  {
    title: "Company",
    items: [
      "About",
      "Newsroom",
      "Careers",
      "Students",
      "UX Research"
    ]
  },
  {
    title: "Resources",
    items: [
      "Dev Community",
      "MegaGrants",
      "Support-A-Creator",
      "Creator Agreement",
      "Distribute on Epic Games",
      "Unreal Engine Branding Guidelines",
      "Fan Art Policy",
      "Community Rules",
      "EU Digital Services Act Inquiries",
      "Epic Pro Support"
    ]
  }
];
function Footer() {
  const [idx, setIdx] = useState([])
  const handleIndex = (index) => {
    if (idx.includes(index)) setIdx(idx.filter(item => item != index))
    else setIdx([...idx, index])
  }
  return (
    <footer className="bg-neutral-900 text-neutral-300 px-3 md:px-16 py-10">
      <div className="">
        <div className="mb-8 flex items-center justify-between">
          <img src="/images/logo.png" alt="Epic Games" className="h-10" />
          <div className="flex items-center gap-5">
            {
              socialMedias.map((item, index) => <div className="text-2xl" key={index}>{item}</div>)
            }
          </div>
        </div>
        <div className="md:flex flex-wrap justify-between md:border-b border-neutral-700 pb-8">
          <div className="grid  md:grid-cols-4 lg:grid-cols-6 md:gap-6 text-sm">
            {
              footerData.map((item, index, arr) => <div key={index} className={`border-t md:border-0 border-[#39393D] ${index == arr.length - 1 ? "border-b border-[#39393D]" : ""}`}>
                <h3 onClick={() => handleIndex(index)} className="font-semibold flex items-center justify-between text-white py-4 text-xl md:mb-4">
                  <span>{item.title}</span>
                  <MdOutlineArrowBackIos className={`${idx.includes(index) ? "rotate-[90deg]" : "-rotate-[90deg]"} md:hidden duration-300 `} />
                </h3>
                <ul className={`${idx.includes(index) ? "block" : "hidden"} md:block pb-3 space-y-1`}>
                  {
                    item.items.map((item, index) => <li className={`py-1.5 hover:text-white cursor-pointer `} key={index}>{item}</li>)
                  }
                </ul>
              </div>)
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-neutral-400 space-y-4 md:space-y-0">
          <p className="max-w-4xl text-center md:text-left">
            © 2025, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Unreal Engine, Fortnite, and the Fortnite logo are trademarks or registered trademarks of Epic Games, Inc. in the United States and elsewhere.
          </p>
          <div className="flex items-center flex-wrap space-x-6">
            <span className="whitespace-nowrap hover:underline">Terms of Service</span>
            <span className="whitespace-nowrap hover:underline">Privacy Policy</span>
            <span className="whitespace-nowrap hover:underline">Safety & Security</span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#3A3A3E] hover:bg-neutral-500 cursor-pointer text-white px-4 py-2 rounded flex items-center gap-1"
          >
            Back to top <CgArrowTopLeftO className="mt-1 ml-1 transform rotate-[45deg]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
export default Footer