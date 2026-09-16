import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      {/* Top Bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBack}
            className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:border-pink-300 hover:text-pink-600 active:scale-95"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
            Get in Touch
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
            We'd love to hear
            <span className="block text-pink-600">from you.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg">
            Have a question about our bouquets, orders or delivery? Send us a
            message and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          
          {/* Contact Information */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
              Contact Information
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Let's talk about flowers.
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              Whether you need help choosing a bouquet or have a question
              about your order, we're here to help.
            </p>

            <div className="mt-7 space-y-3 sm:mt-8 sm:space-y-4">
              
              {/* Email */}
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                    support@flower.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-pink-600">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-gray-900">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-pink-600">
                  <Clock size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Working Hours
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Monday - Saturday
                  </p>
                  <p className="text-xs text-gray-500">
                    10:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100 sm:p-7 lg:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
                Send a Message
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                How can we help?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 text-sm font-semibold text-white transition hover:bg-pink-700 active:scale-[0.98]"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-10 text-center shadow-xl shadow-pink-100 sm:px-10 sm:py-14">
          <div className="text-3xl">💐</div>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
            We're always happy to help.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-pink-50 sm:text-base">
            Your special moments matter to us. Let us help you find the
            perfect bouquet.
          </p>

          <a
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-pink-600 transition hover:bg-pink-50 active:scale-[0.98] sm:h-12 sm:px-7"
          >
            Explore Bouquets
          </a>
        </div>
      </section>
    </div>
  );
};