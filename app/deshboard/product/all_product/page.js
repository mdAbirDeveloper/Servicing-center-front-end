/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AllProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const [editProduct, setEditProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    company: "",
    name: "",
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    image: {
      image: "",
      thumbnail: "",
      deleteUrl: "",
    },
  });

  const categories = [
    "Headphone",
    "Speaker",
    "Protector Glass",
    "iPhone Parts",
    "Android Phone Parts",
    "Charger",
    "Power Bank",
    "Smart Watch",
  ];

  const companies = [
    // Phone manufacturers
    "Apple",
    "Samsung",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Vivo",
    "OnePlus",
    "Nokia",
    "Sony",
    "Huawei",
    "Motorola",
    "LG",
    "Asus",
    "Lenovo",
    "Tecno",
    "Itel",
    "Infinix",
    "Google",
    "Oraimo",
    "Anker",
    "JBL",
    "Sony Accessories",
    "Bose",
    "Skullcandy",
    "Sennheiser",
    "Remax",
    "Baseus",
    "Ugreen",
    "Xcentz",
    "Spigen",
    "OtterBox",
    "Caseology",
    "Ringke",
    "Other",
  ];

  // Admin verify
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (
      !storedUser ||
      storedUser.admin?.role !== "Admin" ||
      storedUser.admin?.isApprove !== true
    ) {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
      fetchProducts();
    }
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/product/all-products",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) setProducts(data.data);
    } catch (err) {
      console.error(err);
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

  // Delete product
  const handleDelete = async (product) => {
    if (!confirm("Are you sure to delete this product?")) return;
    try {
      const encodedDeleteUrl = encodeURIComponent(product.image.deleteUrl);
      const res = await fetch(
        `http://localhost:5000/api/v1/product/delete/${product._id}?deleteUrl=${encodedDeleteUrl}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      if (res.ok) fetchProducts();
      else alert(data.message || "Delete failed");
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditProduct(product);
    setFormData({
      category: product.category,
      company: product.company,
      name: product.name,
      title: product.title,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || "",
      quantity: product.quantity,
      image: product.image,
    });
    setEditModalOpen(true);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedImage = editProduct.image;
    if (imageFile) updatedImage = await uploadImage(imageFile);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/product/update/${editProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...formData,
            image: updatedImage,
            updatedBy: {
              name: user.admin.name,
              email: user.admin.email,
              role: user.admin.role,
            },
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setEditModalOpen(false);
        fetchProducts();
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Discount_Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Thumbnail</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border border-primary">
              {products?.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 border border-primary py-2">{p.name}</td>
                  <td className="px-4 border border-primary py-2">{p.price}</td>
                  <td className="px-4 border border-primary py-2">{p.discountPrice}</td>
                  <td className="px-4 border border-primary py-2">{p.quantity}</td>
                  <td className="px-4 border border-primary py-2">
                    <img
                      src={p.image.thumbnail}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-5 flex gap-2 justify-around border">
                    <Button onClick={() => openEditModal(p)} >Update</Button>
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => handleDelete(p)}
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
        <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            {/* Category */}
            <div className="flex flex-col">
              <Label>Category</Label>
              <select
                className="w-full border rounded p-2"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <Label>Company</Label>
              <select
                className="w-full border rounded p-2"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              >
                <option value="">Select Company</option>
                {companies.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="flex flex-col">
              <Label>Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <Label>Description</Label>
              <textarea
                className="w-full border rounded p-2 resize-none"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label>Price</Label>
                <Input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label>Discount Price (optional)</Label>
                <Input
                  value={formData.discountPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, discountPrice: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <Label>Quantity</Label>
              <Input
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>

            {/* Image */}
            <div className="flex flex-col">
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button
              type="button"
                variant="outline"
                onClick={() => setEditModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
