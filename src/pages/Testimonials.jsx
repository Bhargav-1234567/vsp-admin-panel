import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { testimonialsDataUpdate } from "../store/formJsonSlice";
import store from "../store/store";
import { useUpdateInitialJsonDataMutation } from "../store/apiSlice";
import Loader from "../components/Loader";

// Component for Client Review Item with its own field array
const ClientReviewItem = ({
  reviewIndex,
  control,
  register,
  errors,
  removeReview,
  fieldName,
}) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-700">
          {fieldName === "clientReview"
            ? "Client Review"
            : "More Client Review"}{" "}
          {reviewIndex + 1}
        </h3>
        <button
          type="button"
          onClick={() => removeReview(reviewIndex)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            {...register(`${fieldName}.${reviewIndex}.name`, {
              required: "Name is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
          {errors[fieldName]?.[reviewIndex]?.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors[fieldName][reviewIndex].name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position *
          </label>
          <input
            {...register(`${fieldName}.${reviewIndex}.position`, {
              required: "Position is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter position"
          />
          {errors[fieldName]?.[reviewIndex]?.position && (
            <p className="text-red-500 text-sm mt-1">
              {errors[fieldName][reviewIndex].position.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating *
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            {...register(`${fieldName}.${reviewIndex}.rating`, {
              required: "Rating is required",
              min: { value: 0, message: "Rating must be at least 0" },
              max: { value: 5, message: "Rating cannot exceed 5" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter rating (0-5)"
          />
          {errors[fieldName]?.[reviewIndex]?.rating && (
            <p className="text-red-500 text-sm mt-1">
              {errors[fieldName][reviewIndex].rating.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date & Time *
          </label>
          <input
            type="datetime-local"
            {...register(`${fieldName}.${reviewIndex}.dateTime`, {
              required: "Date and time is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[fieldName]?.[reviewIndex]?.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors[fieldName][reviewIndex].dateTime.message}
            </p>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Tag</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label *
            </label>
            <input
              {...register(`${fieldName}.${reviewIndex}.tag.label`, {
                required: "Tag label is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tag label"
            />
            {errors[fieldName]?.[reviewIndex]?.tag?.label && (
              <p className="text-red-500 text-sm mt-1">
                {errors[fieldName][reviewIndex].tag.label.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color *
            </label>
            <Controller
              name={`${fieldName}.${reviewIndex}.tag.color`}
              control={control}
              defaultValue="#3b82f6"
              rules={{ required: "Tag color is required" }}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={value}
                    onChange={onChange}
                    className="w-10 h-10 rounded border border-gray-300"
                  />
                  <input
                    value={value}
                    onChange={onChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter hex color code"
                  />
                </div>
              )}
            />
            {errors[fieldName]?.[reviewIndex]?.tag?.color && (
              <p className="text-red-500 text-sm mt-1">
                {errors[fieldName][reviewIndex].tag.color.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { testimonials } = useSelector((state) => state.formJson);
  const [updateJson, { isLoading }] = useUpdateInitialJsonDataMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...testimonials },
  });

  const {
    fields: numericFields,
    append: appendNumeric,
    remove: removeNumeric,
  } = useFieldArray({
    control,
    name: "numerics",
  });

  const {
    fields: clientReviewFields,
    append: appendClientReview,
    remove: removeClientReview,
  } = useFieldArray({
    control,
    name: "clientReview",
  });

  const {
    fields: moreClientReviewFields,
    append: appendMoreClientReview,
    remove: removeMoreClientReview,
  } = useFieldArray({
    control,
    name: "moreClientReview",
  });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: "videos",
  });

  const {
    fields: reviewByServiceFields,
    append: appendReviewByService,
    remove: removeReviewByService,
  } = useFieldArray({
    control,
    name: "reviewByService",
  });

  const onSubmit = (data) => {
    store.dispatch(testimonialsDataUpdate({ ...data }));
    updateJson(store.getState().formJson);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Reviews and Analytics Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Numerics Section */}
          <div className="border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Numerics</h2>
              <button
                type="button"
                onClick={() => appendNumeric({ label: "", count: 0 })}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Numeric
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {numericFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">
                      Numeric {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeNumeric(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label *
                      </label>
                      <input
                        {...register(`numerics.${index}.label`, {
                          required: "Label is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter label"
                      />
                      {errors.numerics?.[index]?.label && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numerics[index].label.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Count *
                      </label>
                      <input
                        type="number"
                        {...register(`numerics.${index}.count`, {
                          required: "Count is required",
                          valueAsNumber: true,
                          min: { value: 0, message: "Count must be positive" },
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter count"
                      />
                      {errors.numerics?.[index]?.count && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numerics[index].count.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Review Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Client Reviews
              </h2>
              <button
                type="button"
                onClick={() =>
                  appendClientReview({
                    name: "",
                    position: "",
                    rating: "",
                    dateTime: "",
                    tag: { label: "", color: "#3b82f6" },
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Client Review
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {clientReviewFields.map((field, index) => (
                <ClientReviewItem
                  key={field.id}
                  reviewIndex={index}
                  control={control}
                  register={register}
                  errors={errors}
                  removeReview={removeClientReview}
                  fieldName="clientReview"
                />
              ))}
            </div>
          </div>

          {/* More Client Review Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                More Client Reviews
              </h2>
              <button
                type="button"
                onClick={() =>
                  appendMoreClientReview({
                    name: "",
                    position: "",
                    rating: "",
                    dateTime: "",
                    tag: { label: "", color: "#3b82f6" },
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add More Client Review
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {moreClientReviewFields.map((field, index) => (
                <ClientReviewItem
                  key={field.id}
                  reviewIndex={index}
                  control={control}
                  register={register}
                  errors={errors}
                  removeReview={removeMoreClientReview}
                  fieldName="moreClientReview"
                />
              ))}
            </div>
          </div>

          {/* Videos Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Videos</h2>
              <button
                type="button"
                onClick={() =>
                  appendVideo({
                    url: "",
                    title: "",
                    duration: "",
                    subTitle: "",
                    description: "",
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Video
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {videoFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">
                      Video {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL *
                      </label>
                      <input
                        {...register(`videos.${index}.url`, {
                          required: "URL is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter video URL"
                      />
                      {errors.videos?.[index]?.url && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.videos[index].url.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        {...register(`videos.${index}.title`, {
                          required: "Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter video title"
                      />
                      {errors.videos?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.videos[index].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration *
                      </label>
                      <input
                        {...register(`videos.${index}.duration`, {
                          required: "Duration is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter duration (e.g., 2:30)"
                      />
                      {errors.videos?.[index]?.duration && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.videos[index].duration.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sub Title *
                      </label>
                      <input
                        {...register(`videos.${index}.subTitle`, {
                          required: "Sub title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter sub title"
                      />
                      {errors.videos?.[index]?.subTitle && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.videos[index].subTitle.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`videos.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                      />
                      {errors.videos?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.videos[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review By Service Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Reviews By Service
              </h2>
              <button
                type="button"
                onClick={() =>
                  appendReviewByService({
                    title: "",
                    rating: "",
                    review: "",
                    name: "",
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Service Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewByServiceFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">
                      Service Review {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeReviewByService(index)}
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
                        {...register(`reviewByService.${index}.title`, {
                          required: "Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title"
                      />
                      {errors.reviewByService?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.reviewByService[index].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        {...register(`reviewByService.${index}.rating`, {
                          required: "Rating is required",
                          min: {
                            value: 0,
                            message: "Rating must be at least 0",
                          },
                          max: { value: 5, message: "Rating cannot exceed 5" },
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter rating (0-5)"
                      />
                      {errors.reviewByService?.[index]?.rating && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.reviewByService[index].rating.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review *
                      </label>
                      <textarea
                        {...register(`reviewByService.${index}.review`, {
                          required: "Review is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter review"
                      />
                      {errors.reviewByService?.[index]?.review && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.reviewByService[index].review.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        {...register(`reviewByService.${index}.name`, {
                          required: "Name is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                      {errors.reviewByService?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.reviewByService[index].name.message}
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

export default Testimonials;
