
import React, { useState } from "react";
import {
  ArrowLeft,
  Flower2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#fffafa] text-gray-800">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* Decorative circles */}

        <div
          className="
            absolute
            -top-24
            -left-24
            w-72
            h-72
            rounded-full
            bg-pink-100/60
            blur-2xl
          "
        />

        <div
          className="
            absolute
            -bottom-28
            -right-24
            w-80
            h-80
            rounded-full
            bg-rose-100/50
            blur-2xl
          "
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              hover:text-pink-600
              transition
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />
            Back
          </button>

          {/* HERO CONTENT */}

          <div className="text-center py-12">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-pink-50
                border
                border-pink-100
                text-pink-600
                text-sm
                font-semibold
              "
            >
              <Flower2 size={16} />
              Contact Flower
            </div>

            <h1
              className="
                text-4xl
                sm:text-5xl
                font-extrabold
                text-gray-900
                mt-5
              "
            >
              We'd love to hear
              <span className="text-pink-500">
                {" "}from you.
              </span>
            </h1>

            <p
              className="
                max-w-2xl
                mx-auto
                mt-4
                text-sm
                sm:text-base
                text-gray-500
                leading-7
              "
            >
              Have a question about an order, flowers, delivery,
              or anything else? Send us a message and we'll be
              happy to help.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">

        <div
          className="
            grid
            lg:grid-cols-[0.85fr_1.15fr]
            gap-6
            items-start
          "
        >

          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <div className="space-y-4">

            {/* EMAIL */}

            <div
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                p-6
                hover:shadow-md
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Mail
                  size={21}
                  className="text-pink-500"
                />
              </div>

              <h3 className="font-bold text-gray-900 mt-4">
                Email Us
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Have a question? Drop us an email.
              </p>

              <p className="text-sm font-medium text-gray-700 mt-3">
                support@flower.com
              </p>

            </div>

            {/* PHONE */}

            <div
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                p-6
                hover:shadow-md
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-purple-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Phone
                  size={21}
                  className="text-purple-500"
                />
              </div>

              <h3 className="font-bold text-gray-900 mt-4">
                Call Us
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                We're happy to help with your queries.
              </p>

              <p className="text-sm font-medium text-gray-700 mt-3">
                +91 98765 43210
              </p>

            </div>

            {/* LOCATION */}

            <div
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                p-6
                hover:shadow-md
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-rose-50
                  flex
                  items-center
                  justify-center
                "
              >
                <MapPin
                  size={21}
                  className="text-rose-500"
                />
              </div>

              <h3 className="font-bold text-gray-900 mt-4">
                Our Location
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Come say hello to us.
              </p>

              <p className="text-sm font-medium text-gray-700 mt-3">
                Mumbai, Maharashtra, India
              </p>

            </div>

            {/* HOURS */}

            <div
              className="
                bg-gradient-to-br
                from-pink-50
                to-rose-50
                rounded-3xl
                border
                border-pink-100
                p-6
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Clock
                    size={20}
                    className="text-pink-500"
                  />
                </div>

                <div>

                  <h3 className="font-bold text-gray-900">
                    Support Hours
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Monday – Saturday · 9:00 AM – 7:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT CONTACT FORM
          ================================================= */}

          <div
            className="
              bg-white
              rounded-[28px]
              border
              border-gray-100
              shadow-sm
              p-6
              sm:p-8
            "
          >

            {/* FORM HEADER */}

            <div className="mb-7">

              <div className="flex items-center gap-2">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Heart
                    size={19}
                    className="text-pink-500"
                    fill="currentColor"
                  />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Send us a message
                  </h2>

                  <p className="text-xs text-gray-400">
                    We'll get back to you soon.
                  </p>

                </div>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME + EMAIL */}

              <div className="grid sm:grid-cols-2 gap-4">

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                      focus:outline-none
                      focus:border-pink-400
                      focus:ring-2
                      focus:ring-pink-50
                      transition
                    "
                    required
                  />

                </div>

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                      focus:outline-none
                      focus:border-pink-400
                      focus:ring-2
                      focus:ring-pink-50
                      transition
                    "
                    required
                  />

                </div>

              </div>

              {/* SUBJECT */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                  "
                >
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="What would you like to ask?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="
                    input
                    input-bordered
                    w-full
                    rounded-xl
                    focus:outline-none
                    focus:border-pink-400
                    focus:ring-2
                    focus:ring-pink-50
                    transition
                  "
                  required
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                  "
                >
                  Message
                </label>

                <textarea
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="
                    textarea
                    textarea-bordered
                    w-full
                    rounded-xl
                    resize-none
                    focus:outline-none
                    focus:border-pink-400
                    focus:ring-2
                    focus:ring-pink-50
                    transition
                  "
                  required
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-gray-900
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-pink-600
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  active:translate-y-0
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >
                Send Message
                <Send size={17} />
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">

        <div
          className="
            text-center
            rounded-3xl
            bg-gradient-to-r
            from-pink-50
            to-rose-50
            border
            border-pink-100
            p-8
          "
        >

          <div className="text-3xl">
            🌷
          </div>

          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-gray-900
              mt-3
            "
          >
            We're here to make your day brighter.
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Thank you for choosing Flower.
          </p>

        </div>

      </section>

    </div>
  );
};

