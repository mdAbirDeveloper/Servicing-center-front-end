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

const AddSeries = () => {
  const router = useRouter();
  const [seriesName, setSeriesName] = useState("");
  const [companieName, setCompanieName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [series, setSeries] = useState([]);
  const [editSeries, setEditSeries] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Check Admin
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser || storedUser.admin?.role !== "Admin" || storedUser.admin?.isApprove !== true) {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
      fetchCompanies();
      fetchSeries();
    }
  }, []);

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/company/all-company",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) setCompanies(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch series
  const fetchSeries = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/series/all-series",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) setSeries(data.data);
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

  // Add Series
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!seriesName || !companieName || !imageFile) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/series/add-series",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: seriesName,
            company: companieName,
            image: imageUrl,
            addedBy: {
              name: user.admin.name,
              email: user.admin.email,
              role: user.admin.role,
            },
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccess("Series added successfully!");
        setSeriesName("");
        setCompanieName("");
        setImageFile(null);
        fetchSeries();
      } else setError(data.message || "Failed to add series");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete series
  const handleDelete = async (seriesItem) => {
    setLoading(true);
    if (!confirm("Are you sure to delete this series?")) return;
    try {
      const encodedDeleteUrl = encodeURIComponent(seriesItem.image.deleteUrl);
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/series/delete/${seriesItem._id}?deleteUrl=${encodedDeleteUrl}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) fetchSeries();
      else alert(data.message || "Delete failed");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  // Update modal open
  const openEditModal = (s) => {
    setEditSeries(s);
    setSeriesName(s.name);
    setCompanieName(s.company);
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let updatedImage = editSeries.image;
      if (imageFile) {
        updatedImage = await uploadImage(imageFile);
      }

      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/series/update/${editSeries._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: seriesName,
            company: companieName,
            image: updatedImage,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        throw new Error(data.message || "Update failed");
      }

      setSuccess("Series updated successfully!");
      setEditModalOpen(false);
      fetchSeries(); // refresh list
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      {/* Add Series Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Series</CardTitle>
          <CardDescription>
            Select a company and enter series info
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label className="mb-1.5" htmlFor="seriesName">Series Name</Label>
              <Input
                id="seriesName"
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="mb-1.5">Company</Label>
              <Select
                value={companieName}
                onValueChange={(val) => setCompanieName(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((c) => (
                    <SelectItem key={c._id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5" htmlFor="seriesImage">Series Image</Label>
              <Input
                id="seriesImage"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Series"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Series Table */}
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>All Series</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              {/* Simple spinner */}
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
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Thumbnail</th>
                  <th className="px-4 py-2 text-left">Company</th>
                  <th className="px-4 py-2 text-left">Added By</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {[...series]?.reverse().map((s) => (
                  <tr
                    key={s._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 font-medium">{s.name}</td>
                    <td className="px-4 py-2">
                      <img
                        src={s.image.thumbnail}
                        alt={s.name}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    </td>
                    <td className="px-4 py-2">{s.company}</td>
                    <td className="px-4 py-2">
                      {s.addedBy?.name} ({s.addedBy?.email})
                    </td>
                    <td className="px-4 py-2 flex flex-col gap-2">
                      <Button onClick={() => openEditModal(s)}>Update</Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(s)}
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
            <DialogTitle>Update Series</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <Label className="mb-1.5">Series Name</Label>
              <Input
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="mb-1.5">Company</Label>
              <Select
                value={companieName}
                onValueChange={(val) => setCompanieName(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((c) => (
                    <SelectItem key={c._id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5">Series Image</Label>
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

export default AddSeries;
