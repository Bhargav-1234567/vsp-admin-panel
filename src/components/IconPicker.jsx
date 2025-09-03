import React, { useState } from "react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import { useFormContext, Controller } from "react-hook-form";
import { X } from "lucide-react";
const IconPickerModal = ({ isOpen, onClose, onSelect, currentIcon }) => {
  const [search, setSearch] = useState("");
  console.log({ currentIcon });
  if (!isOpen) return null;

  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Select an Icon</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search icons..."
            className="w-full border rounded p-2 mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <p className="text-sm text-gray-600 mb-2">
            {filteredIcons.length} icons found
          </p>
        </div>

        <div className="overflow-y-auto flex-grow p-4">
          <div className="grid grid-cols-6 gap-4">
            {filteredIcons.map((name) => (
              <button
                key={name}
                className={`flex flex-col items-center p-2 rounded hover:bg-gray-100 transition-colors ${
                  currentIcon === name
                    ? "bg-blue-100 border border-blue-300"
                    : ""
                }`}
                onClick={() => {
                  onSelect(name);
                  onClose();
                }}
                title={name}
              >
                <DynamicIcon
                  name={name}
                  className="w-6 h-6"
                  size={24}
                  strokeWidth={2}
                />
                <span className="text-xs mt-1 text-center truncate w-full">
                  {name}
                </span>
              </button>
            ))}
          </div>

          {filteredIcons.length === 0 && search && (
            <div className="text-center text-gray-500 py-8">
              No icons found matching "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Icon Picker Component
const IconPicker = ({ control, name, defaultValue = "", required }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: required ? "Please select an icon" : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          <button
            type="button"
            className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {field.value ? (
              <DynamicIcon
                name={field.value}
                size={32}
                strokeWidth={1.5}
                className="text-gray-700"
              />
            ) : (
              <div className="text-gray-400 text-sm text-center">
                Select Icon
              </div>
            )}
          </button>

          <IconPickerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={(iconName) => {
              field.onChange(iconName);
            }}
            currentIcon={field.value}
          />

          {field.value && (
            <div className="mt-2 text-xs text-gray-500 truncate">
              {field.value}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default IconPicker;
