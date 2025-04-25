import React, { useEffect, useState } from "react";
import { useClientStore } from "../store/useClientStore";
import { axiosInstance } from "../lib/axios";

const AddClient = () => {
  const { createClient } = useClientStore();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    company: "",
    software: "",
    state: "",
    district: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const res = await axiosInstance.get("/data/states");
      setStates(res.data);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state) {
      const fetchDistricts = async () => {
        const res = await axiosInstance.get(`/data/districts/${formData.state}`);
        setDistricts(res.data);
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClient(formData);
    setFormData({
      name: "",
      number: "",
      email: "",
      company: "",
      software: "",
      state: "",
      district: "",
    });
    setDistricts([]); // reset districts after submission
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full p-2 border rounded" />
        <input name="number" value={formData.number} onChange={handleChange} required placeholder="Phone Number" className="w-full p-2 border rounded" />
        <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="company" value={formData.company} onChange={handleChange} required placeholder="Company" className="w-full p-2 border rounded" />
        <input name="software" value={formData.software} onChange={handleChange} required placeholder="Software" className="w-full p-2 border rounded" />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Province</option>
          {states.map((state) => (
            <option key={state.StateId} value={state.StateId}>
              {state.StateName}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.DistrictId} value={district.DistrictId}>
              {district.DistrictName}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default AddClient;
