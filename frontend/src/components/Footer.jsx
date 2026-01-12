import { Facebook, Instagram, Twitter, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer footer-center p-10 bg-base-200 text-base-content mt-4">
      <div className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/" className="link link-hover">
          Products
        </Link>{" "}
        <Link to="#about" className="link link-hover">
          About
        </Link>{" "}
        <Link to="#contact" className="link link-hover">
          Contact
        </Link>
      </div>

      <div>
        <div className="grid grid-flow-col gap-4">
          {/* Social media stuff */}

          <a href="/" className="link" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="/" className="link" aria-label="instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="/" className="link" aria-label="facebook">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="font-bold text-lg">
        <p>SalesHorse</p>
        <p className="text-sm mt-2">
          Built with React, Express, MongoDB, Node.js & DaisyUI
        </p>
      </div>
      <div>
        <p>Copyright © {currentYear} SalesHorse. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
