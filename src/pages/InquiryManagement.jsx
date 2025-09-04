import React, { useState } from "react";
import {
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
  useSoftDeleteInquiryMutation,
  useRestoreInquiryMutation,
  usePermanentDeleteInquiryMutation,
} from "../store/inquiryApiSlice";

const InquiryManagement = () => {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactPreference: "",
    status: "",
  });
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // API calls
  const {
    data: inquiriesData,
    isLoading,
    refetch,
  } = useGetInquiriesQuery(filters);
  const [updateInquiry] = useUpdateInquiryMutation();
  const [softDeleteInquiry] = useSoftDeleteInquiryMutation();
  const [restoreInquiry] = useRestoreInquiryMutation();
  const [permanentDeleteInquiry] = usePermanentDeleteInquiryMutation();

  // Filter inquiries based on active tab
  const filteredInquiries =
    inquiriesData?.inquiries?.filter((inquiry) =>
      activeTab === "inquiries" ? inquiry.status === 1 : inquiry.status === 0
    ) || [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (inquiry) => {
    setEditingInquiry(inquiry);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateInquiry({
        id: editingInquiry.id,
        ...editingInquiry,
      }).unwrap();
      setIsEditModalOpen(false);
      setEditingInquiry(null);
      refetch();
    } catch (error) {
      console.error("Failed to update inquiry:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await softDeleteInquiry(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to reject inquiry:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreInquiry(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to restore inquiry:", error);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await permanentDeleteInquiry(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to permanently delete inquiry:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inquiry Management</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "inquiries"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("inquiries")}
        >
          Inquiries
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "rejected"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={filters.firstName}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={filters.lastName}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Preference
            </label>
            <select
              name="contactPreference"
              value={filters.contactPreference}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">All</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="sms">SMS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredInquiries.length} inquiries found
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Preference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {inquiry.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {inquiry.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {inquiry.contactPreference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      inquiry.status === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {inquiry.status === 1 ? "Active" : "Rejected"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {activeTab === "inquiries" ? (
                    <>
                      <button
                        onClick={() => handleEdit(inquiry)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleReject(inquiry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleRestore(inquiry.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(inquiry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingInquiry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Edit Inquiry
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editingInquiry.firstName}
                    onChange={(e) =>
                      setEditingInquiry({
                        ...editingInquiry,
                        firstName: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editingInquiry.lastName}
                    onChange={(e) =>
                      setEditingInquiry({
                        ...editingInquiry,
                        lastName: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingInquiry.email}
                    onChange={(e) =>
                      setEditingInquiry({
                        ...editingInquiry,
                        email: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editingInquiry.phone}
                    onChange={(e) =>
                      setEditingInquiry({
                        ...editingInquiry,
                        phone: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contact Preference
                  </label>
                  <select
                    value={editingInquiry.contactPreference}
                    onChange={(e) =>
                      setEditingInquiry({
                        ...editingInquiry,
                        contactPreference: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;
