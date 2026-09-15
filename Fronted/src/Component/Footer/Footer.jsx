import React from "react";
import {
  Flower2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">

      {/* ================= MAIN FOOTER ================= */}

      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-20 py-14">

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-14
          "
        >

          {/* ================= BRAND ================= */}

          <div>

            <div className="flex items-center gap-2">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-pink-500
                  flex
                  items-center
                  justify-center
                "
              >
                <Flower2
                  size={22}
                  className="text-white"
                />
              </div>

              <h2 className="text-2xl font-extrabold">
                Bloom<span className="text-pink-500">Nest</span>
              </h2>

            </div>

            <p
              className="
                mt-5
                text-sm
                leading-6
                text-gray-400
                max-w-sm
              "
            >
              Fresh and beautiful flowers crafted with
              love to make every special moment even more
              memorable.
            </p>

            {/* Social */}

            <div className="flex items-center gap-3 mt-6">

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-900
                  border
                  border-gray-800
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-bold
                  hover:bg-pink-500
                  hover:border-pink-500
                  transition-all
                  duration-300
                "
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-900
                  border
                  border-gray-800
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-bold
                  hover:bg-pink-500
                  hover:border-pink-500
                  transition-all
                  duration-300
                "
              >
                FB
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-900
                  border
                  border-gray-800
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-bold
                  hover:bg-pink-500
                  hover:border-pink-500
                  transition-all
                  duration-300
                "
              >
                X
              </a>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <div className="w-8 h-[2px] bg-pink-500 mt-3 mb-5" />

            <ul className="space-y-3">

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Flowers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Bouquets
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Contact Us
                </a>
              </li>

            </ul>

          </div>

          {/* ================= CUSTOMER SERVICE ================= */}

          <div>

            <h3 className="text-lg font-bold">
              Customer Care
            </h3>

            <div className="w-8 h-[2px] bg-pink-500 mt-3 mb-5" />

            <ul className="space-y-3">

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  My Account
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Track Order
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Wishlist
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  Terms & Conditions
                </a>
              </li>

            </ul>

          </div>

          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="text-lg font-bold">
              Get In Touch
            </h3>

            <div className="w-8 h-[2px] bg-pink-500 mt-3 mb-5" />

            <div className="space-y-4">

              {/* Location */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="text-pink-500 mt-1 shrink-0"
                />

                <p className="text-sm text-gray-400 leading-5">
                  Mumbai, Maharashtra, India
                </p>

              </div>

              {/* Email */}

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-pink-500 shrink-0"
                />

                <a
                  href="mailto:support@bloomnest.com"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  support@bloomnest.com
                </a>

              </div>

              {/* Phone */}

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-pink-500 shrink-0"
                />

                <a
                  href="tel:+919999999999"
                  className="
                    text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                  "
                >
                  +91 99999 99999
                </a>

              </div>

            </div>

            {/* Newsletter */}

            <div className="mt-6">

              <p className="text-sm font-semibold mb-3">
                Stay updated with us
              </p>

              <div className="flex">

                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    min-w-0
                    flex-1
                    h-10
                    px-3
                    rounded-l-lg
                    bg-gray-900
                    border
                    border-gray-800
                    text-sm
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    focus:border-pink-500
                  "
                />

                <button
                  type="button"
                  className="
                    w-11
                    h-10
                    rounded-r-lg
                    bg-pink-500
                    flex
                    items-center
                    justify-center
                    hover:bg-pink-600
                    transition-colors
                  "
                >
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="border-t border-gray-800">

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-12
            xl:px-20
            py-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          <p className="text-xs sm:text-sm text-gray-500 text-center">
            © 2026 BloomNest. All rights reserved.
          </p>

          <p
            className="
              flex
              items-center
              gap-1
              text-xs
              sm:text-sm
              text-gray-500
            "
          >
            Made with
            <Heart
              size={14}
              className="text-pink-500 fill-pink-500"
            />
            for flower lovers
          </p>

        </div>

      </div>

    </footer>
  );
};