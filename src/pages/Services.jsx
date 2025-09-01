import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import store from "../store/store";
import { servicesDataUpdate } from "../store/formJsonSlice";
import { useUpdateInitialJsonDataMutation } from "../store/apiSlice";
import Loader from "../components/Loader";

// Separate component for Service Item with its own field array
const ServiceItem = ({
  serviceIndex,
  control,
  register,
  errors,
  removeService,
}) => {
  const {
    fields: infoPointFields,
    append: appendInfoPoint,
    remove: removeInfoPoint,
  } = useFieldArray({
    control,
    name: `services.${serviceIndex}.infoPoints`,
  });

  return (
    <div className="border border-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-700">
          Service {serviceIndex + 1}
        </h3>
        <button
          type="button"
          onClick={() => removeService(serviceIndex)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            {...register(`services.${serviceIndex}.title`, {
              required: "Service title is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter service title"
          />
          {errors.services?.[serviceIndex]?.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.services[serviceIndex].title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register(`services.${serviceIndex}.price`, {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
          {errors.services?.[serviceIndex]?.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.services[serviceIndex].price.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          {...register(`services.${serviceIndex}.description`, {
            required: "Description is required",
          })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter service description"
        />
        {errors.services?.[serviceIndex]?.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.services[serviceIndex].description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Info Points
        </label>
        <div className="space-y-2">
          {infoPointFields.map((field, pointIndex) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                {...register(
                  `services.${serviceIndex}.infoPoints.${pointIndex}`
                )}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter info point"
              />
              <button
                type="button"
                onClick={() => removeInfoPoint(pointIndex)}
                className="text-red-600 hover:text-red-800 px-2 py-1"
                disabled={infoPointFields.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendInfoPoint("")}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add Info Point
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const { services } = useSelector((state) => state.formJson);
  const [updateJson, { isLoading }] = useUpdateInitialJsonDataMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...services },
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  const {
    fields: processFields,
    append: appendProcess,
    remove: removeProcess,
  } = useFieldArray({
    control,
    name: "process",
  });

  const onSubmit = (data) => {
    store.dispatch(servicesDataUpdate({ ...data }));
    updateJson(store.getState().formJson);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Services and Process Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Main Title and Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Title *
              </label>
              <input
                {...register("mainTitle", {
                  required: "Main title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter main title"
              />
              {errors.mainTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mainTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Title *
              </label>
              <input
                {...register("subTitle", { required: "Sub title is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sub title"
              />
              {errors.subTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subTitle.message}
                </p>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Services</h2>
              <button
                type="button"
                onClick={() =>
                  appendService({
                    title: "",
                    description: "",
                    infoPoints: [""],
                    price: "0.00",
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {serviceFields.map((service, serviceIndex) => (
                <ServiceItem
                  key={service.id}
                  serviceIndex={serviceIndex}
                  control={control}
                  register={register}
                  errors={errors}
                  removeService={removeService}
                />
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Process</h2>
              <button
                type="button"
                onClick={() => appendProcess({ title: "", description: "" })}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Process Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processFields.map((process, processIndex) => (
                <div
                  key={process.id}
                  className="border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">
                      Process Step {processIndex + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeProcess(processIndex)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        {...register(`process.${processIndex}.title`, {
                          required: "Process title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter process title"
                      />
                      {errors.process?.[processIndex]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.process[processIndex].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`process.${processIndex}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter process description"
                      />
                      {errors.process?.[processIndex]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.process[processIndex].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              {isLoading && <Loader />} Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Services;
