import React, { useEffect } from "react";
import { useClientStore } from "../store/useClientStore";
import { useDataStore } from "../store/useDataStore";

const Dashboard = () => {
  const { clients, fetchClients, loading } = useClientStore();
  const {
    states,
    allDistricts,
    fetchStates,
    fetchAllDistricts
  } = useDataStore();

  useEffect(() => {
    fetchClients();
    fetchStates();
    fetchAllDistricts();
  }, []);

  const getProvinceName = (id) => {
    const state = states.find((s) => s.StateId === id);
    return state ? state.StateName : "Unknown";
  };

  const getDistrictName = (id) => {
    const district = allDistricts.find((d) => d.DistrictId === id);
    return district ? district.DistrictName : "Unknown";
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Clients</h2>
      {loading ? (
        <p>Loading clients...</p>
      ) : clients.length === 0 ? (
        <p>No clients added yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Software</th>
              <th className="border p-2">Province</th>
              <th className="border p-2">District</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="text-center border-t">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.number}</td>
                <td className="p-2">{client.company}</td>
                <td className="p-2">{client.software}</td>
                <td className="p-2">{getProvinceName(client.state)}</td>
                <td className="p-2">{getDistrictName(client.district)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
