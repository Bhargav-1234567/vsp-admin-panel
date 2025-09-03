import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { companyDataUpdate } from "../store/formJsonSlice";
import store from "../store/store";
import { useUpdateInitialJsonDataMutation } from "../store/apiSlice";
import Loader from "../components/Loader";
import IconPicker from "../components/IconPicker";

const Company = () => {
  const { company } = useSelector((state) => state.formJson);
  const [updateJson, { isLoading }] = useUpdateInitialJsonDataMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...company },
  });

  const {
    fields: historyFields,
    append: appendHistory,
    remove: removeHistory,
  } = useFieldArray({
    control,
    name: "companyHistory",
  });

  const {
    fields: valuesFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: "coreValues",
  });

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({
    control,
    name: "expertTeam",
  });

  const {
    fields: awardsFields,
    append: appendAward,
    remove: removeAward,
  } = useFieldArray({
    control,
    name: "awards",
  });

  const onSubmit = (data) => {
    store.dispatch(companyDataUpdate({ ...data }));
    updateJson(store.getState().formJson);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Reviews and Analytics Form
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sub title"
              />
              {errors.subTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subTitle.message}
                </p>
              )}
            </div>
          </div>

          {/* Our Story Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Our Story Main Title *
                </label>
                <input
                  {...register("ourStory.mainTitle", {
                    required: "Our story main title is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter our story main title"
                />
                {errors.ourStory?.mainTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ourStory.mainTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Our Story Sub Title *
                </label>
                <input
                  {...register("ourStory.subTitle", {
                    required: "Our story sub title is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter our story sub title"
                />
                {errors.ourStory?.subTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ourStory.subTitle.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Story *
                </label>
                <textarea
                  {...register("storyPara", { required: "Story is required" })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Story"
                />

                {errors.storyPara && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.storyPara.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Company History Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Company History
              </h2>
              <button
                type="button"
                onClick={() =>
                  appendHistory({ year: "", title: "", description: "" })
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add History Item
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {historyFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-blue-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">History Item {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeHistory(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year *
                      </label>
                      <input
                        {...register(`companyHistory.${index}.year`, {
                          required: "Year is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter year"
                      />
                      {errors.companyHistory?.[index]?.year && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyHistory[index].year.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        {...register(`companyHistory.${index}.title`, {
                          required: "Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title"
                      />
                      {errors.companyHistory?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyHistory[index].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`companyHistory.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                      />
                      {errors.companyHistory?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyHistory[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Core Values
              </h2>
              <button
                type="button"
                onClick={() => appendValue({ title: "", description: "" })}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Core Value
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valuesFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-green-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Value {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeValue(index)}
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
                        {...register(`coreValues.${index}.title`, {
                          required: "Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title"
                      />
                      {errors.coreValues?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.coreValues[index].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`coreValues.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                      />
                      {errors.coreValues?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.coreValues[index].description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon *
                      </label>
                      <IconPicker
                        control={control}
                        name={`coreValues.${index}.icon`}
                        required
                      />

                      {errors.coreValues?.[index]?.icon && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.coreValues?.[index].icon.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Team Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Expert Team
              </h2>
              <button
                type="button"
                onClick={() =>
                  appendTeam({
                    name: "",
                    position: "",
                    description: "",
                    labels: [{ color: "#3b82f6", label: "" }],
                  })
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {teamFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-purple-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Team Member {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeTeam(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        {...register(`expertTeam.${index}.name`, {
                          required: "Name is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                      {errors.expertTeam?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.expertTeam[index].name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position *
                      </label>
                      <input
                        {...register(`expertTeam.${index}.position`, {
                          required: "Position is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter position"
                      />
                      {errors.expertTeam?.[index]?.position && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.expertTeam[index].position.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`expertTeam.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                      />
                      {errors.expertTeam?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.expertTeam[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Labels</h4>
                    <div className="space-y-3">
                      {field.labels.map((label, labelIndex) => (
                        <div
                          key={labelIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="color"
                            {...register(
                              `expertTeam.${index}.labels.${labelIndex}.color`
                            )}
                            className="w-10 h-10 rounded border border-gray-300"
                          />
                          <input
                            {...register(
                              `expertTeam.${index}.labels.${labelIndex}.label`,
                              { required: "Label text is required" }
                            )}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter label text"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Awards</h2>
              <button
                type="button"
                onClick={() => appendAward({ title: "", description: "" })}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Award
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awardsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-amber-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Award {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeAward(index)}
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
                        {...register(`awards.${index}.title`, {
                          required: "Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title"
                      />
                      {errors.awards?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.awards[index].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`awards.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                      />
                      {errors.awards?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.awards[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6 flex justify-center">
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

export default Company;
