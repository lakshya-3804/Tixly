import React from "react";
import tixlogo from "../assets/tixlylogo.jpg";
import instalogo from "../assets/icons8-instagram-50.png";
import fblogo from "../assets/icons8-facebook-50.png";
import discordlogo from "../assets/icons8-discord-50.png";
import tlgmlogo from "../assets/icons8-telegram-50.png";
import gthblogo from "../assets/icons8-github-96.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-[1px]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
            {/* logo and title */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img src={tixlogo} className="h-10 me-3" alt="FlowBite Logo" />
              <p className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Tixly
              </p>
            </div>
              <p className="text-gray-400 text-lg m-4 ml-1 w-[50%]">
                Your easy and reliable train ticket booking platform. Book, manage, and travel hassle-free with real-time updates and seamless service.
              </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            {/* Resources */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline"> Help Center </a>
                </li>
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline"> Blog </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline"> FAQ </a>
                </li>
              </ul>
            </div>

                {/* Follow */}
            {/* <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="https://github.com/themesberg/flowbite" className="hover:underline" >
                        {" "}Github{" "}
                    </a>
                </li>
                <li>
                  <a href="https://discord.gg/4eeurUVvTy" className="hover:underline"> Discord </a>
                </li>
              </ul>
            </div> */}

            <div>
                {/* Legal */}
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Legal
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline"> Privacy Policy </a>
                </li>
                <li>
                  <a href="#" className="hover:underline"> Terms & Conditions </a>
                </li>
                <li>
                  <a href="#" className="hover:underline"> Cookie Policy </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center text-gray-400">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Tixly™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-x-5">
            <a href="#" className="w-7 h-7">
              <img src={discordlogo} alt="discord logo" className="hover:border-b" />
            </a>
            <a href="#" className="w-7 h-7">
              <img src={fblogo} alt="fb logo" className="hover:border-b"/>
            </a>
            <a href="#" className="w-7 h-7">
              <img src={tlgmlogo} alt="tlgm logo" className="hover:border-b" />
            </a>
            <a href="#" className="w-7 h-7">
              <img src={instalogo} alt="insta logo" className="hover:border-b" />
            </a>
            <a href="#" className="w-7 h-7">
              <img src={gthblogo} alt="githb logo" className="hover:border-b" />
            </a>
            
            {/* Repeat other social icons similarly */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
