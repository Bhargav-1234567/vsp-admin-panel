import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { contactDataUpdate } from "../store/formJsonSlice";
import store from "../store/store";

const Contact = () => {
  const { contact } = useSelector((state) => state.formJson);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...contact },
  });

  const onSubmit = (data) => {
    let updatedState = store.dispatch(contactDataUpdate({ ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Information Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Office Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Office Address *
            </label>
            <textarea
              {...register("officeAddress", {
                required: "Office address is required",
                minLength: {
                  value: 10,
                  message: "Address should be at least 10 characters long",
                },
              })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full office address"
            />
            {errors.officeAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.officeAddress.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number (e.g., +1234567890)"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              {...register("emailAddress", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
            {errors.emailAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailAddress.message}
              </p>
            )}
          </div>

          {/* Business Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Hours *
            </label>
            <textarea
              {...register("BusinessHours", {
                required: "Business hours are required",
                minLength: {
                  value: 5,
                  message:
                    "Business hours should be at least 5 characters long",
                },
              })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business hours (e.g., Mon-Fri: 9AM-5PM, Sat: 10AM-2PM)"
            />
            {errors.BusinessHours && (
              <p className="text-red-500 text-sm mt-1">
                {errors.BusinessHours.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
