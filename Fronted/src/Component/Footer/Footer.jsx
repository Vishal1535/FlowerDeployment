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
    <footer className="w-full overflow-hidden bg-white text-gray-800">

      {/* ================= TOP LINE ================= */}

      <div className="h-1 w-full bg-gradient-to-r from-pink-200 via-pink-500 to-pink-200" />

      {/* ================= MAIN FOOTER ================= */}

      <div
        className="
          w-full
          bg-gradient-to-b
          from-pink-50/60
          to-white
          px-4
          min-[380px]:px-5
          sm:px-8
          lg:px-12
          xl:px-20
          py-10
          sm:py-14
          lg:py-16
        "
      >
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

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div className="min-w-0">

            {/* Logo */}

            <div className="flex items-center gap-2.5">

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  shrink-0
                  rounded-2xl
                  bg-pink-500
                  flex
                  items-center
                  justify-center
                  shadow-[0_8px_20px_rgba(236,72,153,0.20)]
                "
              >
                <Flower2
                  size={22}
                  className="text-white"
                  strokeWidth={2}
                />
              </div>

              <h2
                className="
                  text-xl
                  min-[380px]:text-2xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                "
              >
                Bloom
                <span className="text-pink-500">
                  Nest
                </span>
              </h2>

            </div>

            {/* Description */}

            <p
              className="
                mt-4
                sm:mt-5
                max-w-sm
                text-xs
                sm:text-sm
                leading-6
                text-gray-500
              "
            >
              Fresh and beautiful flowers crafted with
              love to make every special moment even more
              memorable.
            </p>

            {/* Highlight */}

            <div
              className="
                mt-4
                sm:mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                border
                border-pink-100
                px-3
                py-2
                shadow-sm
              "
            >
              <span className="w-2 h-2 rounded-full bg-pink-500" />

              <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                Made with love for flower lovers
              </span>
            </div>

            {/* ================= SOCIAL ================= */}

            <div className="flex items-center gap-2.5 sm:gap-3 mt-5 sm:mt-6">

              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  flex
                  items-center
                  justify-center
                  text-pink-500
                  text-xs
                  font-bold
                  shadow-sm
                  hover:bg-pink-500
                  hover:border-pink-500
                  hover:text-white
                  hover:-translate-y-1
                  hover:shadow-md
                  transition-all
                  duration-300
                "
              >
                IG
              </a>

              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  flex
                  items-center
                  justify-center
                  text-pink-500
                  text-lg
                  font-bold
                  shadow-sm
                  hover:bg-pink-500
                  hover:border-pink-500
                  hover:text-white
                  hover:-translate-y-1
                  hover:shadow-md
                  transition-all
                  duration-300
                "
              >
                f
              </a>

              {/* X */}

              <a
                href="#"
                aria-label="X"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  flex
                  items-center
                  justify-center
                  text-pink-500
                  text-sm
                  font-bold
                  shadow-sm
                  hover:bg-pink-500
                  hover:border-pink-500
                  hover:text-white
                  hover:-translate-y-1
                  hover:shadow-md
                  transition-all
                  duration-300
                "
              >
                X
              </a>

            </div>

          </div>

          {/* ================================================= */}
          {/* QUICK LINKS */}
          {/* ================================================= */}

          <div className="min-w-0">

            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Quick Links
            </h3>

            <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3 mb-4 sm:mb-5">

              <span className="w-7 sm:w-8 h-[2px] bg-pink-500 rounded-full" />

              <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />

            </div>

            <ul className="space-y-3 sm:space-y-3.5">

              {[
                "Home",
                "Flowers",
                "Bouquets",
                "About Us",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      w-fit
                      text-xs
                      sm:text-sm
                      text-gray-500
                      hover:text-pink-500
                      transition-all
                      duration-200
                    "
                  >
                    <ArrowRight
                      size={13}
                      className="
                        text-pink-400
                        opacity-0
                        -translate-x-2
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                      "
                    />

                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* ================================================= */}
          {/* CUSTOMER CARE */}
          {/* ================================================= */}

          <div className="min-w-0">

            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Customer Care
            </h3>

            <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3 mb-4 sm:mb-5">

              <span className="w-7 sm:w-8 h-[2px] bg-pink-500 rounded-full" />

              <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />

            </div>

            <ul className="space-y-3 sm:space-y-3.5">

              {[
                "My Account",
                "Track Order",
                "Wishlist",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      w-fit
                      text-xs
                      sm:text-sm
                      text-gray-500
                      hover:text-pink-500
                      transition-all
                      duration-200
                    "
                  >
                    <ArrowRight
                      size={13}
                      className="
                        text-pink-400
                        opacity-0
                        -translate-x-2
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                      "
                    />

                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <div className="min-w-0">

            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Get In Touch
            </h3>

            <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3 mb-4 sm:mb-5">

              <span className="w-7 sm:w-8 h-[2px] bg-pink-500 rounded-full" />

              <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />

            </div>

            <div className="space-y-2.5 sm:space-y-3">

              {/* Location */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  shadow-[0_5px_20px_rgba(0,0,0,0.04)]
                  hover:border-pink-300
                  hover:shadow-[0_8px_25px_rgba(236,72,153,0.10)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    shrink-0
                    rounded-lg
                    bg-pink-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MapPin
                    size={17}
                    className="text-pink-500"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400">
                    Location
                  </p>

                  <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 truncate">
                    Mumbai, Maharashtra
                  </p>

                </div>

              </div>

              {/* Email */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  shadow-[0_5px_20px_rgba(0,0,0,0.04)]
                  hover:border-pink-300
                  hover:shadow-[0_8px_25px_rgba(236,72,153,0.10)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    shrink-0
                    rounded-lg
                    bg-pink-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Mail
                    size={17}
                    className="text-pink-500"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400">
                    Email Us
                  </p>

                  <a
                    href="mailto:support@bloomnest.com"
                    className="
                      block
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-gray-700
                      mt-0.5
                      truncate
                      hover:text-pink-500
                      transition-colors
                    "
                  >
                    support@bloomnest.com
                  </a>

                </div>

              </div>

              {/* Phone */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  shadow-[0_5px_20px_rgba(0,0,0,0.04)]
                  hover:border-pink-300
                  hover:shadow-[0_8px_25px_rgba(236,72,153,0.10)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    shrink-0
                    rounded-lg
                    bg-pink-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Phone
                    size={17}
                    className="text-pink-500"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400">
                    Call Us
                  </p>

                  <a
                    href="tel:+919999999999"
                    className="
                      block
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-gray-700
                      mt-0.5
                      hover:text-pink-500
                      transition-colors
                    "
                  >
                    +91 99999 99999
                  </a>

                </div>

              </div>

            </div>

            {/* Newsletter */}

            <div className="mt-5 sm:mt-6">

              <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2.5 sm:mb-3">
                Stay updated with us
              </p>

              <div
                className="
                  flex
                  w-full
                  min-w-0
                  p-1
                  rounded-xl
                  bg-white
                  border
                  border-pink-100
                  shadow-sm
                "
              >

                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    min-w-0
                    flex-1
                    h-8
                    sm:h-9
                    px-2.5
                    sm:px-3
                    rounded-lg
                    bg-transparent
                    text-xs
                    sm:text-sm
                    text-gray-800
                    placeholder:text-gray-400
                    outline-none
                  "
                />

                <button
                  type="button"
                  className="
                    w-9
                    sm:w-10
                    h-8
                    sm:h-9
                    shrink-0
                    rounded-lg
                    bg-pink-500
                    text-white
                    flex
                    items-center
                    justify-center
                    hover:bg-pink-600
                    hover:shadow-md
                    active:scale-95
                    transition-all
                    duration-200
                    cursor-pointer
                  "
                >
                  <ArrowRight
                    size={16}
                    className="sm:w-[17px] sm:h-[17px]"
                  />
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================= */}
      {/* BOTTOM FOOTER */}
      {/* ================================================= */}

      <div className="border-t border-pink-100 bg-white">

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

          <p
            className="
              text-[10px]
              min-[380px]:text-xs
              sm:text-sm
              text-gray-500
              text-center
            "
          >
            © 2026 BloomNest. All rights reserved.
          </p>

          <p
            className="
              flex
              items-center
              gap-1.5
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
              className="
                sm:w-[14px]
                sm:h-[14px]
                text-pink-500
                fill-pink-500
                shrink-0
              "
            />

            for flower lovers
          </p>

        </div>

      </div>

    </footer>
  );
};