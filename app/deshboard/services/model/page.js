/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const AddModel = () => {
  const router = useRouter();

  // Form states
  const [modelName, setModelName] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Data states
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [models, setModels] = useState([]);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editModel, setEditModel] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Check Admin
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser || storedUser.admin?.role !== "Admin") {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
      fetchCompanies();
      fetchModels();
    }
  }, []);

  // Fetch all company names
  const fetchCompanies = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/company/all-company",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) setCompanies(data.data.map((c) => c.name));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch series based on company name
  const fetchSeriesByCompanyName = async (companyName) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/series/company-name/${companyName}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) setSeriesList(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // Fetch all models
  const fetchModels = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/model/all-models", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) setModels(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // Upload image to imgbb
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const API_KEY = "f0a7afbad7f40960ffa500dadc4c0f96";
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      return {
        image: data.data.url,
        thumbnail: data.data.thumb.url,
        deleteUrl: data.data.delete_url,
      };
    } else throw new Error("Image upload failed");
  };

  // Handle company change by name
  const handleCompanyChange = (companyName) => {
    setSelectedCompanyName(companyName);
    setSelectedSeries("");
    fetchSeriesByCompanyName(companyName);
  };

  // Add Model
  const handleAddModel = async (e) => {
    e.preventDefault();
    if (!modelName || !selectedCompanyName || !selectedSeries || !imageFile) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      const res = await fetch("http://localhost:5000/api/v1/model/add-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: modelName,
          company: selectedCompanyName,
          series: selectedSeries,
          image: imageUrl,
          addedBy: {
            name: user.admin.name,
            email: user.admin.email,
            role: user.admin.role,
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Model added successfully!");
        setModelName("");
        setSelectedCompanyName("");
        setSelectedSeries("");
        setImageFile(null);
        fetchModels();
      } else setError(data.message || "Failed to add model");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (m) => {
    setEditModel(m);
    setModelName(m.name);
    setSelectedCompanyName(m.companyName);
    setSelectedSeries(m.series);
    fetchSeriesByCompanyName(m.companyName);
    setEditModalOpen(true);
  };

  // Update Model
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let updatedImage = editModel.image;
      if (imageFile) updatedImage = await uploadImage(imageFile);

      const res = await fetch(
        `http://localhost:5000/api/v1/model/update/${editModel._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: modelName,
            company: selectedCompanyName,
            series: selectedSeries,
            image: updatedImage,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setSuccess("Model updated successfully!");
      setEditModalOpen(false);
      fetchModels();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete model
  const handleDelete = async (modelItem) => {
    if (!confirm("Are you sure to delete this model?")) return;
    setLoading(true);
    try {
      const encodedDeleteUrl = encodeURIComponent(modelItem.image.deleteUrl);
      const res = await fetch(
        `http://localhost:5000/api/v1/model/delete/${modelItem._id}?deleteUrl=${encodedDeleteUrl}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) fetchModels();
      else alert(data.message || "Delete failed");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      {/* Add Model Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Model</CardTitle>
          <CardDescription>Select company, series and enter model info</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleAddModel} className="flex flex-col gap-4">
            <div>
              <Label>Company Name</Label>
              <Select value={selectedCompanyName} onValueChange={handleCompanyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((cName) => (
                    <SelectItem key={cName} value={cName}>
                      {cName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Series</Label>
              <Select
                value={selectedSeries}
                onValueChange={(val) => setSelectedSeries(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select series" />
                </SelectTrigger>
                <SelectContent>
                  {seriesList.map((s) => (
                    <SelectItem key={s._id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Model Name</Label>
              <Input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Model Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Model"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Model Table */}
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>All Models</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">Model Name</th>
                  <th className="px-4 py-2 text-left">Thumbnail</th>
                  <th className="px-4 py-2 text-left">Series</th>
                  <th className="px-4 py-2 text-left">Company</th>
                  <th className="px-4 py-2 text-left">Added By</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {[...models]?.reverse().map((m) => (
                  <tr key={m._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-2 font-medium">{m.name}</td>
                    <td className="px-4 py-2">
                      <img
                        src={m.image.thumbnail}
                        alt={m.name}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    </td>
                    <td className="px-4 py-2">{m.series}</td>
                    <td className="px-4 py-2">{m.company}</td>
                    <td className="px-4 py-2">
                      {m.addedBy?.name} ({m.addedBy?.email})
                    </td>
                    <td className="px-4 py-2 flex flex-col gap-2">
                      <Button onClick={() => openEditModal(m)}>Update</Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(m)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Model</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <Label>Company Name</Label>
              <Select
                value={selectedCompanyName}
                onValueChange={handleCompanyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((cName) => (
                    <SelectItem key={cName} value={cName}>
                      {cName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Series</Label>
              <Select
                value={selectedSeries}
                onValueChange={(val) => setSelectedSeries(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select series" />
                </SelectTrigger>
                <SelectContent>
                  {seriesList.map((s) => (
                    <SelectItem key={s._id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Model Name</Label>
              <Input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Model Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddModel;
