import React from "react";
import tixlogo from "../assets/tixlylogo.jpg";
import instalogo from "../assets/icons8-instagram-50.png";
import fblogo from "../assets/icons8-facebook-50.png";
import discordlogo from "../assets/icons8-discord-50.png";
import tlgmlogo from "../assets/icons8-telegram-50.png";
import gthblogo from "../assets/icons8-github-96.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-700">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-10">
        <div className="md:flex md:justify-between gap-8">

          {/* Brand */}
          <div className="mb-8 md:mb-0 max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <img src={tixlogo} className="h-9 rounded-lg object-cover" alt="Tixly" />
              <span className="text-xl font-bold font-orbitron text-orange-400">Tixly</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your easy and reliable all-in-one ticket booking platform. Book buses, trains, flights and movies — hassle-free with real-time updates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            {/* Resources */}
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-orange-400">Resources</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-orange-400">Legal</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-700" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-slate-500">© 2025 Tixly™. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            {[discordlogo, fblogo, tlgmlogo, instalogo, gthblogo].map((logo, i) => (
              <a key={i} href="#" className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity">
                <img src={logo} alt="social" className="w-full h-full object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
