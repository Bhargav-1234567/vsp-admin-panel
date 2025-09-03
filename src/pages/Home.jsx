import React from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from "react-hook-form";
import { useSelector } from "react-redux";
import store from "../store/store";
import { homeDataUpdate } from "../store/formJsonSlice";
import { useUpdateInitialJsonDataMutation } from "../store/apiSlice";
import Loader from "../components/Loader";
import IconPicker from "../components/IconPicker";

const Home = () => {
  const { home } = useSelector((state) => state.formJson);
  const [updateJson, { isLoading }] = useUpdateInitialJsonDataMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...home },
  });
  const {
    fields: sliderFields,
    append: appendSlider,
    remove: removeSlider,
  } = useFieldArray({
    control,
    name: "sliderItems",
  });

  const {
    fields: expertiseItemsFields,
    append: appendExpertiseItem,
    remove: removeExpertiseItem,
  } = useFieldArray({
    control,
    name: "expertise.items",
  });

  const {
    fields: whyChooseFields,
    append: appendWhyChoose,
    remove: removeWhyChoose,
  } = useFieldArray({
    control,
    name: "whyChoose",
  });

  const {
    fields: numericFields,
    append: appendNumeric,
    remove: removeNumeric,
  } = useFieldArray({
    control,
    name: "numerics",
  });

  const onSubmit = (data) => {
    console.log({ data });
    store.dispatch(homeDataUpdate({ ...data }));
    updateJson(store.getState().formJson);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Data</h1>

        <FormProvider {...useForm()}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Slider Items Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Slider Items
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sliderFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-gray-50 p-4 rounded-lg space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-700">
                        Slider Item {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeSlider(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Main Title *
                      </label>
                      <input
                        {...register(`sliderItems.${index}.mainTitle`, {
                          required: "Main title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.sliderItems?.[index]?.mainTitle && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sliderItems[index].mainTitle.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sub Title *
                      </label>
                      <input
                        {...register(`sliderItems.${index}.subTitle`, {
                          required: "Sub title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.sliderItems?.[index]?.subTitle && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sliderItems[index].subTitle.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`sliderItems.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.sliderItems?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sliderItems[index].description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link *
                      </label>
                      <input
                        {...register(`sliderItems.${index}.link`, {
                          required: "Link is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.sliderItems?.[index]?.link && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sliderItems[index].link.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  appendSlider({
                    mainTitle: "",
                    subTitle: "",
                    description: "",
                    link: "",
                  })
                }
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Slider Item
              </button>
            </div>
            {/* <IconPicker control={control} name={"iconPick"} /> */}
            {/* Expertise Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Expertise
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expertise Sub Title *
                </label>
                <input
                  {...register("expertise.subTitle", {
                    required: "Expertise sub title is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.expertise?.subTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expertise.subTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Expertise Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expertiseItemsFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="bg-gray-50 p-4 rounded-lg space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-600">
                          Item {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeExpertiseItem(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          {...register(`expertise.items.${index}.title`, {
                            required: "Title is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.expertise?.items?.[index]?.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expertise.items[index].title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          {...register(`expertise.items.${index}.description`, {
                            required: "Description is required",
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.expertise?.items?.[index]?.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expertise.items[index].description.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon *
                        </label>
                        <IconPicker
                          control={control}
                          name={`expertise.items.${index}.icon`}
                          required
                        />

                        {errors.expertise?.items?.[index]?.icon && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expertise.items[index].icon.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendExpertiseItem({ title: "", description: "" })
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Expertise Item
                </button>
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Why Choose
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyChooseFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-gray-50 p-4 rounded-lg space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-700">
                        Item {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeWhyChoose(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        {...register(`whyChoose.${index}.title`, {
                          required: "Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.whyChoose?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.whyChoose[index].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...register(`whyChoose.${index}.description`, {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.whyChoose?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.whyChoose[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => appendWhyChoose({ title: "", description: "" })}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Why Choose Item
              </button>
            </div>

            {/* Numerics Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Numerics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {numericFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-gray-50 p-4 rounded-lg space-y-4"
                  >
                    <div className="flex justify-between items-center">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label *
                      </label>
                      <input
                        {...register(`numerics.${index}.label`, {
                          required: "Label is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.numerics?.[index]?.count && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numerics[index].count.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <input
                        type="text"
                        placeholder="eg. %,+,-"
                        {...register(`numerics.${index}.status`, {
                          required: "Status is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.numerics?.[index]?.status && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numerics[index].status.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => appendNumeric({ label: "", count: 0 })}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Numeric Item
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                {isLoading && <Loader />} Submit Form
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Home;
