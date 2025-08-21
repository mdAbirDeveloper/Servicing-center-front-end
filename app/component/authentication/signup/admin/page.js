/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AdminSignupPage() {
  const [formData, setFormData] = useState({
    role: "Admin",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords and Confirm password do not match!",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/admin/create-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessage({
          type: "success",
          text: "Signup successful! please wait until approve you account",
        });
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.message || "Signup failed!" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage({
        type: "error",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-[400px] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Floating label input */}
              {["name", "phone", "email"].map((field) => (
                <div key={field} className="relative">
                  <Input
                    id={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    placeholder=" "
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="peer placeholder-transparent focus:ring-2 focus:ring-gray-300 transition-all"
                  />
                  <Label
                    htmlFor={field}
                    className="absolute left-3 -top-2.5 text-xs text-gray-500 transition-all 
                      peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm 
                      peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 
                      peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-600"
                  >
                    {field === "name"
                      ? "Name"
                      : field === "phone"
                      ? "Number"
                      : "Email"}
                  </Label>
                </div>
              ))}

              {/* Password field with eye toggle */}
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="peer placeholder-transparent focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <Label
                  htmlFor="password"
                  className="absolute left-3 -top-2.5 text-xs text-gray-500 transition-all 
                    peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm 
                    peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 
                    peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-600"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password field with eye toggle */}
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="peer placeholder-transparent focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <Label
                  htmlFor="confirmPassword"
                  className="absolute left-3 -top-2.5 text-xs text-gray-500 transition-all 
                    peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm 
                    peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 
                    peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-600"
                >
                  Confirm Password
                </Label>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Animated Message */}
              <AnimatePresence>
                {message.text && (
                  <motion.p
                    key="form-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`text-sm ${
                      message.type === "error"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {message.text}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Button with hover scale */}
              <Button
                type="submit"
                className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a
                href="/component/authentication/login"
                className="underline hover:text-primary"
              >
                Login
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default AdminSignupPage;
