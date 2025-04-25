import Client from "../models/client.model.js";

export const createClient = async (req, res) => {
  const { name, number, email, company, software, state, district } = req.body;

 
  if (!name || !number || !email || !company || !software || !state || !district) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const client = await Client.create({
      user: req.userId,  
      name,
      number,
      email,
      company,
      software,
      state,     
      district,  
    });

    res.status(201).json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "Failed to create client" });
  }
};


export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.userId });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};
