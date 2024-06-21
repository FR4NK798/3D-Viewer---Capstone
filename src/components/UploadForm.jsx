import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [model, setModel] = useState(null);
  const [geometryId, setGeometryId] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [usedSw, setUsedSw] = useState("");
  const [date, setDate] = useState("");

  const handleFileChange = (e) => {
    setModel(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("model", model);
    formData.append("geometry_id", geometryId);
    formData.append("role", role);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("used_sw", usedSw);
    formData.append("date", date);

    try {
      const response = await axios.post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <input
        type="text"
        value={geometryId}
        onChange={(e) => setGeometryId(e.target.value)}
        placeholder="Geometry ID"
        required
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        required
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={usedSw}
        onChange={(e) => setUsedSw(e.target.value)}
        placeholder="Used Software"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
