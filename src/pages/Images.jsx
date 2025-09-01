import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadImageMutation } from "../store/apiSlice";

const Images = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [previews, setPreviews] = useState({
    logo: null,
    Slide1: null,
    Slide2: null,
    Slide3: null,
    Slide4: null,
    Slide5: null,
  });
  const [uploadImage, { isLoading, isError, data }] = useUploadImageMutation();
  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Here you would typically handle the file upload to a server
    alert("Files selected successfully! Check console for file details.");
  };

  // Handle file preview
  const handleFileChange = async (fieldName, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => ({
          ...prev,
          [fieldName]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);

      /////////
      await uploadImage({ file, filename: fieldName }).unwrap();
    }
  };

  // File validation function
  const validateFile = (file) => {
    if (!file || file.length === 0) return "This field is required";

    const uploadedFile = file[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(uploadedFile.type)) {
      return "Only JPEG and PNG files are allowed";
    }

    if (uploadedFile.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          File Upload Form
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Please upload images in PNG or JPEG format only. Maximum file size:
          5MB
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Logo Upload */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Logo</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Logo *
                </label>
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  {...register("logo", {
                    required: "Logo is required",
                    validate: validateFile,
                  })}
                  onChange={(e) => handleFileChange("logo", e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.logo && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.logo.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: PNG, JPEG. Max size: 5MB
                </p>
              </div>

              {previews.logo && (
                <div className="w-32 h-32 border border-gray-200 rounded-lg p-2">
                  <img
                    src={previews.logo}
                    alt="Logo preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Slides Upload */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Slides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((slideNumber) => {
                const fieldName = `Slide${slideNumber}`;
                return (
                  <div
                    key={slideNumber}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="font-medium text-gray-700 mb-3">
                      Slide {slideNumber} *
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="file"
                          accept=".png,.jpeg,.jpg"
                          {...register(fieldName, {
                            required: `Slide ${slideNumber} is required`,
                            validate: validateFile,
                          })}
                          onChange={(e) =>
                            handleFileChange(fieldName, e.target.files[0])
                          }
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors[fieldName] && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors[fieldName].message}
                          </p>
                        )}
                      </div>

                      {previews[fieldName] && (
                        <div className="w-full h-40 border border-gray-200 rounded-lg p-2">
                          <img
                            src={previews[fieldName]}
                            alt={`Slide ${slideNumber} preview`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Images;
