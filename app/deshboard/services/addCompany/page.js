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

const AddCompany = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [editCompany, setEditCompany] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Admin access check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.admin?.role !== "Admin" || storedUser.admin.isApprove !== true) {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
      fetchCompanies();
    }
  }, []);

  // Fetch all companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/company/all-company",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) setCompanies(data);
      else setError(data.message || "Failed to fetch companies");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  // Image upload to imgbb
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!companyName || !imageFile) {
      setError("Please provide company name and image");
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(imageFile);
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/company/add-company",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: companyName,
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
      if (!res.ok) setError(data.message || "Failed to add company");
      else {
        setSuccess("Company added successfully!");
        setCompanyName("");
        setImageFile(null);
        fetchCompanies();
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete company
  // Frontend handleDelete
  const handleDelete = async (company) => {
    if (!confirm("Are you sure to delete this company?")) return;

    try {
      const encodedDeleteUrl = encodeURIComponent(company.image.deleteUrl);

      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/company/delete/${company._id}?deleteUrl=${encodedDeleteUrl}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) alert(data.message || "Delete failed");
      else fetchCompanies();
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  // Edit company
  const openEditModal = (company) => {
    setEditCompany(company);
    setCompanyName(company.name);
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    let updatedImage = editCompany.image;
    if (imageFile) updatedImage = await uploadImage(imageFile);

    try {
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/company/update/${editCompany._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: companyName,
            image: updatedImage,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) setError(data.message || "Update failed");
      else {
        setSuccess("Company updated successfully!");
        setEditModalOpen(false);
        setCompanyName("");
        setImageFile(null);
        fetchCompanies();
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      {/* Add Company Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Company</CardTitle>
          <CardDescription>
            Enter company name and upload company image
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                className="mt-1.5"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="companyImage">Company Image</Label>
              <Input
                id="companyImage"
                className="mt-1.5"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Company"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>All Companies</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Thumbnail
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Added By
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {companies.data?.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100 font-medium">
                    {c.name}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={c.image.thumbnail}
                      alt={c.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {c.addedBy.name} ({c.addedBy.email})
                  </td>
                  <td className="px-4 py-2 flex flex-col gap-2">
                    <Button
                      onClick={() => openEditModal(c)}
                    >
                      Update
                    </Button>
                    <Button
                      className="w-full text-white bg-red-400 hover:bg-sadcn-destructive/90"
                      onClick={() => handleDelete(c)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Company</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="editCompanyName">Company Name</Label>
              <Input
                id="editCompanyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="editCompanyImage">Company Image</Label>
              <Input
                id="editCompanyImage"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
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

export default AddCompany;
