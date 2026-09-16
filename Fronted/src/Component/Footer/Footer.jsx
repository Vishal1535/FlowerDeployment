import React from "react";
import {
  Flower2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Instagram,
  Facebook,
  Clock,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-800 overflow-hidden">

      {/* =====================================================
          TOP DECORATIVE LINE
      ===================================================== */}

      <div className="w-full h-[3px] bg-pink-500" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="bg-gray-950 text-white">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            min-[380px]:px-5
            sm:px-8
            lg:px-10
            xl:px-14
            py-10
            sm:py-14
            lg:py-16
          "
        >

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-10
              sm:gap-12
              lg:gap-14
            "
          >

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="sm:col-span-2 lg:col-span-1">

              {/* Logo */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11
                    h-11
                    sm:w-12
                    sm:h-12
                    shrink-0
                    rounded-2xl
                    bg-pink-500
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Flower2
                    size={24}
                    className="text-white"
                    strokeWidth={2}
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      font-extrabold
                      tracking-tight
                      text-white
                    "
                  >
                    Bloom
                    <span className="text-pink-400">
                      Nest
                    </span>
                  </h2>

                  <p className="text-[10px] sm:text-xs text-gray-400 tracking-[0.18em] uppercase mt-0.5">
                    Flowers & Happiness
                  </p>
                </div>

              </div>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-md
                  text-sm
                  leading-6
                  text-gray-400
                "
              >
                Beautiful flowers, thoughtful gifts and
                lovely moments — all crafted to make your
                special occasions unforgettable.
              </p>

              {/* Small Highlight */}

              <div
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-full
                  border
                  border-gray-800
                  bg-gray-900
                "
              >
                <span className="w-2 h-2 rounded-full bg-pink-500" />

                <span className="text-xs text-gray-400">
                  Fresh flowers, delivered with love
                </span>
              </div>

              {/* Social */}

              <div className="flex items-center gap-2.5 mt-6">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-pink-500
                    hover:border-pink-500
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <Instagram size={17} />
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-pink-500
                    hover:border-pink-500
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <Facebook size={17} />
                </a>

                <a
                  href="#"
                  aria-label="X"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    text-sm
                    font-bold
                    hover:bg-pink-500
                    hover:border-pink-500
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  X
                </a>

              </div>

            </div>

            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                Quick Links
              </h3>

              <div className="w-10 h-[2px] bg-pink-500 rounded-full mt-3 mb-5" />

              <ul className="space-y-3.5">

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
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-400
                        hover:text-pink-400
                        transition-colors
                        duration-200
                      "
                    >

                      <ArrowRight
                        size={14}
                        className="
                          text-pink-500
                          transition-transform
                          duration-200
                          group-hover:translate-x-1
                        "
                      />

                      {item}

                    </a>

                  </li>
                ))}

              </ul>

            </div>

            {/* =================================================
                CUSTOMER CARE
            ================================================= */}

            <div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                Customer Care
              </h3>

              <div className="w-10 h-[2px] bg-pink-500 rounded-full mt-3 mb-5" />

              <ul className="space-y-3.5">

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
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-400
                        hover:text-pink-400
                        transition-colors
                        duration-200
                      "
                    >

                      <ArrowRight
                        size={14}
                        className="
                          text-pink-500
                          transition-transform
                          duration-200
                          group-hover:translate-x-1
                        "
                      />

                      {item}

                    </a>

                  </li>
                ))}

              </ul>

            </div>

            {/* =================================================
                CONTACT
            ================================================= */}

            <div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                Get In Touch
              </h3>

              <div className="w-10 h-[2px] bg-pink-500 rounded-full mt-3 mb-5" />

              <div className="space-y-3">

                {/* LOCATION */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    hover:border-pink-500/40
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
                      bg-pink-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <MapPin
                      size={17}
                      className="text-pink-400"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Location
                    </p>

                    <p className="text-sm font-medium text-gray-300 mt-0.5 truncate">
                      Mumbai, Maharashtra
                    </p>

                  </div>

                </div>

                {/* EMAIL */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    hover:border-pink-500/40
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
                      bg-pink-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Mail
                      size={17}
                      className="text-pink-400"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Email
                    </p>

                    <a
                      href="mailto:support@bloomnest.com"
                      className="
                        block
                        text-xs
                        sm:text-sm
                        font-medium
                        text-gray-300
                        mt-0.5
                        truncate
                        hover:text-pink-400
                        transition-colors
                      "
                    >
                      support@bloomnest.com
                    </a>

                  </div>

                </div>

                {/* PHONE */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    hover:border-pink-500/40
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
                      bg-pink-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Phone
                      size={17}
                      className="text-pink-400"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Phone
                    </p>

                    <a
                      href="tel:+919999999999"
                      className="
                        block
                        text-sm
                        font-medium
                        text-gray-300
                        mt-0.5
                        hover:text-pink-400
                        transition-colors
                      "
                    >
                      +91 99999 99999
                    </a>

                  </div>

                </div>

                {/* SUPPORT HOURS */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-gray-900
                    border
                    border-gray-800
                    hover:border-pink-500/40
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
                      bg-pink-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Clock
                      size={17}
                      className="text-pink-400"
                    />
                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Support Hours
                    </p>

                    <p className="text-sm font-medium text-gray-300 mt-0.5">
                      Mon - Sun · 9 AM - 9 PM
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              NEWSLETTER
          ================================================= */}

          <div
            className="
              mt-10
              sm:mt-12
              lg:mt-14
              pt-7
              sm:pt-8
              border-t
              border-gray-800
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
              lg:gap-10
            "
          >

            <div className="min-w-0">

              <p className="text-base sm:text-lg font-bold text-white">
                Stay in Bloom 🌸
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Get updates about fresh flowers and special offers.
              </p>

            </div>

            <div
              className="
                flex
                w-full
                lg:max-w-md
                p-1
                rounded-xl
                bg-gray-900
                border
                border-gray-800
              "
            >

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  min-w-0
                  flex-1
                  h-10
                  sm:h-11
                  px-3
                  sm:px-4
                  bg-transparent
                  text-sm
                  text-white
                  placeholder:text-gray-500
                  outline-none
                "
              />

              <button
                type="button"
                className="
                  w-10
                  sm:w-11
                  h-10
                  sm:h-11
                  shrink-0
                  rounded-lg
                  bg-pink-500
                  text-white
                  flex
                  items-center
                  justify-center
                  hover:bg-pink-600
                  active:scale-95
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}

      <div className="bg-black border-t border-gray-900">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            min-[380px]:px-5
            sm:px-8
            lg:px-10
            xl:px-14
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
              size={13}
              className="text-pink-500 fill-pink-500 shrink-0"
            />

            for flower lovers
          </p>

        </div>

      </div>

    </footer>
  );
};