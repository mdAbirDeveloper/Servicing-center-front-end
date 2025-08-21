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

const AddProduct = () => {
  const router = useRouter();
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

  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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


  // Admin check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.admin?.role !== "Admin") {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
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

    if (!imageFile) {
      setError("Please select an image!");
      return;
    }

    setLoading(true);
    try {
      const uploaded = await uploadImage(imageFile);

      const res = await fetch(
        "http://localhost:5000/api/v1/product/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...formData,
            image: {
              image: uploaded.image,
              thumbnail: uploaded.thumbnail,
              deleteUrl: uploaded.deleteUrl,
            },
            createdBy: {
              name: user.admin.name,
              email: user.admin.email,
              role: user.admin.role,
            },
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) setError(data.message || "Failed to add product");
      else {
        setSuccess("Product added successfully!");
        setFormData({
          category: "",
          company: "",
          name: "",
          title: "",
          description: "",
          price: "",
          discountPrice: "",
          quantity: "",
          image: "",
          thumbnail: "",
          deleteUrl: "",
        });
        setImageFile(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label className="mb-1.5" htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="company">Company</Label>
              <select
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Company</option>
                {companies.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-1.5" htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="discountPrice">Discount Price (Optional)</Label>
              <Input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="">
              <Label className="mb-1.5" htmlFor="image">Product Image</Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
