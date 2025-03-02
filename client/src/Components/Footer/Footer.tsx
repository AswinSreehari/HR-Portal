// import React from 'react';
// import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

// interface FooterProps {
//   companyName?: string;
//   showSocialIcons?: boolean;
//   darkMode?: boolean;
// }

// const Footer: React.FC<FooterProps> = ({
//   companyName = 'Your Company',
//   showSocialIcons = true,
//   darkMode = false,
// }) => {
//   const currentYear = new Date().getFullYear();
  
//   // Define base styles based on dark mode
//   const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
//   const textColor = darkMode ? 'text-white' : 'text-gray-800';
//   const borderColor = darkMode ? 'border-gray-700' : 'border-gray-300';
//   const mutedTextColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  
//   return (
//     <footer className={`${bgColor} ${textColor} py-8 w-full`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           {/* Logo and copyright */}
//           <div className="mb-6 md:mb-0">
//             <div className="flex items-center">
//               <img
//                 src="/api/placeholder/40/40"
//                 alt="Logo"
//                 className="h-10 w-10 mr-3"
//               />
//               <span className="text-xl font-bold">{companyName}</span>
//             </div>
//             <p className="text-sm mt-2">
//               &copy; {currentYear} {companyName}. All rights reserved.
//             </p>
//           </div>

//           {/* Navigation links */}
//           <div className="mb-6 md:mb-0">
//             <ul className="flex flex-wrap justify-center gap-6">
//               <li>
//                 <a href="#" className={`${textColor} hover:underline`}>Home</a>
//               </li>
//               <li>
//                 <a href="#" className={`${textColor} hover:underline`}>About</a>
//               </li>
//               <li>
//                 <a href="#" className={`${textColor} hover:underline`}>Services</a>
//               </li>
//               <li>
//                 <a href="#" className={`${textColor} hover:underline`}>Blog</a>
//               </li>
//               <li>
//                 <a href="#" className={`${textColor} hover:underline`}>Contact</a>
//               </li>
//             </ul>
//           </div>

//           {/* Social icons */}
//           {showSocialIcons && (
//             <div>
//               <div className="flex space-x-4">
//                 <a href="#" className={`${textColor} hover:opacity-75 transition-opacity duration-150`}>
//                   <FaTwitter size={24} />
//                 </a>
//                 <a href="#" className={`${textColor} hover:opacity-75 transition-opacity duration-150`}>
//                   <FaFacebook size={24} />
//                 </a>
//                 <a href="#" className={`${textColor} hover:opacity-75 transition-opacity duration-150`}>
//                   <FaInstagram size={24} />
//                 </a>
//                 <a href="#" className={`${textColor} hover:opacity-75 transition-opacity duration-150`}>
//                   <FaLinkedin size={24} />
//                 </a>
//                 <a href="#" className={`${textColor} hover:opacity-75 transition-opacity duration-150`}>
//                   <FaGithub size={24} />
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Second row with additional links */}
//         <div className={`mt-8 pt-6 border-t ${borderColor}`}>
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-sm mb-4 md:mb-0">
//               <a href="#" className={`${textColor} hover:underline mr-4`}>Privacy Policy</a>
//               <a href="#" className={`${textColor} hover:underline mr-4`}>Terms of Service</a>
//               <a href="#" className={`${textColor} hover:underline`}>Cookie Policy</a>
//             </div>
//             <div className={`text-sm ${mutedTextColor}`}>
//               Designed with ❤️ by Your Team
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from 'react';

// export default function App() {
//   return (
//     <footer
//       className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left ">
//       <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
//         © 2023 Copyright <br/>
//         Made with ❤️ by Aswin
         
//       </div>
//     </footer>
//   );
// }
 
import React from 'react'

const Footer = () => {
  return (
    <div> </div>
  )
}

export default Footer