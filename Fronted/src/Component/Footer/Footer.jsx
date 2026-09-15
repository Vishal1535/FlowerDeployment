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
    <footer className="bg-gray-950 text-white w-full overflow-hidden">

      {/* ================= MAIN FOOTER ================= */}

      <div className="
        w-full
        px-4
        min-[380px]:px-5
        sm:px-8
        lg:px-12
        xl:px-20
        py-10
        sm:py-14
      ">

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
            sm:gap-10
            lg:gap-14
          "
        >

          {/* ================= BRAND ================= */}

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  shrink-0
                  rounded-xl
                  bg-pink-500
                  flex
                  items-center
                  justify-center
                "
              >
                <Flower2
                  size={20}
                  className="sm:w-[22px] sm:h-[22px] text-white"
                />
              </div>

              <h2 className="
                text-xl
                min-[380px]:text-2xl
                font-extrabold
              ">
                Bloom<span className="text-pink-500">Nest</span>
              </h2>

            </div>

            <p
              className="
                mt-4
                sm:mt-5
                text-xs
                sm:text-sm
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

            <div className="flex items-center gap-2.5 sm:gap-3 mt-5 sm:mt-6">

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-gray-900
                  border
                  border-gray-800
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  sm:text-xs
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
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-gray-900
                  border
                  border-gray-800
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  sm:text-xs
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
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-gray-900
                  border
                  border-gray-800
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  sm:text-xs
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

          <div className="min-w-0">

            <h3 className="text-base sm:text-lg font-bold">
              Quick Links
            </h3>

            <div className="w-7 sm:w-8 h-[2px] bg-pink-500 mt-2 sm:mt-3 mb-4 sm:mb-5" />

            <ul className="space-y-2.5 sm:space-y-3">

              <li>
                <a
                  href="#"
                  className="
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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

          <div className="min-w-0">

            <h3 className="text-base sm:text-lg font-bold">
              Customer Care
            </h3>

            <div className="w-7 sm:w-8 h-[2px] bg-pink-500 mt-2 sm:mt-3 mb-4 sm:mb-5" />

            <ul className="space-y-2.5 sm:space-y-3">

              <li>
                <a
                  href="#"
                  className="
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
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

          <div className="min-w-0">

            <h3 className="text-base sm:text-lg font-bold">
              Get In Touch
            </h3>

            <div className="w-7 sm:w-8 h-[2px] bg-pink-500 mt-2 sm:mt-3 mb-4 sm:mb-5" />

            <div className="space-y-3 sm:space-y-4">

              {/* Location */}

              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">

                <MapPin
                  size={17}
                  className="sm:w-[18px] sm:h-[18px] text-pink-500 mt-1 shrink-0"
                />

                <p className="
                  text-xs
                  sm:text-sm
                  text-gray-400
                  leading-5
                ">
                  Mumbai, Maharashtra, India
                </p>

              </div>

              {/* Email */}

              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

                <Mail
                  size={17}
                  className="sm:w-[18px] sm:h-[18px] text-pink-500 shrink-0"
                />

                <a
                  href="mailto:support@bloomnest.com"
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-400
                    hover:text-pink-500
                    transition-colors
                    truncate
                  "
                >
                  support@bloomnest.com
                </a>

              </div>

              {/* Phone */}

              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

                <Phone
                  size={17}
                  className="sm:w-[18px] sm:h-[18px] text-pink-500 shrink-0"
                />

                <a
                  href="tel:+919999999999"
                  className="
                    text-xs
                    sm:text-sm
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

            <div className="mt-5 sm:mt-6">

              <p className="text-xs sm:text-sm font-semibold mb-2.5 sm:mb-3">
                Stay updated with us
              </p>

              <div className="flex w-full min-w-0">

                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    min-w-0
                    flex-1
                    h-9
                    sm:h-10
                    px-2.5
                    sm:px-3
                    rounded-l-lg
                    bg-gray-900
                    border
                    border-gray-800
                    text-xs
                    sm:text-sm
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    focus:border-pink-500
                  "
                />

                <button
                  type="button"
                  className="
                    w-10
                    sm:w-11
                    h-9
                    sm:h-10
                    shrink-0
                    rounded-r-lg
                    bg-pink-500
                    flex
                    items-center
                    justify-center
                    hover:bg-pink-600
                    transition-colors
                  "
                >
                  <ArrowRight
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
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
            px-4
            min-[380px]:px-5
            sm:px-8
            lg:px-12
            xl:px-20
            py-4
            sm:py-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-2
            sm:gap-3
          "
        >

          <p className="
            text-[10px]
            min-[380px]:text-xs
            sm:text-sm
            text-gray-500
            text-center
          ">
            © 2026 BloomNest. All rights reserved.
          </p>

          <p
            className="
              flex
              items-center
              gap-1
              text-[10px]
              min-[380px]:text-xs
              sm:text-sm
              text-gray-500
              text-center
            "
          >
            Made with
            <Heart
              size={12}
              className="sm:w-[14px] sm:h-[14px] text-pink-500 fill-pink-500 shrink-0"
            />
            for flower lovers
          </p>

        </div>

      </div>

    </footer>
  );
};