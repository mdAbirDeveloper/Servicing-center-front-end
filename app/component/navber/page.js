"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { MdBuild } from "react-icons/md"; // Servicing icon
import {
  MenuIcon,
  XIcon,
  LogOut,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "iPhone Service",
    href: "/component/services/iphone",
    description: "Expert repair & optimization for iPhones.",
  },
  {
    title: "Android Phone Service",
    href: "/component/services/android",
    description: "Fast and reliable Android phone servicing.",
  },
];

const products = [
  { title: "Headphone", href: "/products/iphone-parts" },
  { title: "Speaker", href: "/products/android-parts" },
  { title: "Protector_Glass", href: "/products/ear-accessories" },
  { title: "iPhone_Parts", href: "/products/chargers-cables" },
  { title: "Android_Phone_Parts", href: "/products/pc-laptop-accessories" },
  { title: "Charger", href: "/products/pc-laptop-accessories" },
  { title: "Power_Bank", href: "/products/pc-laptop-accessories" },
  { title: "Smart_Watch", href: "/products/pc-laptop-accessories" },
];

export function NavigationMenuDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  // 🔥 keep user state in sync with localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserLogin = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) setUser(JSON.parse(updatedUser));
    };

    window.addEventListener("userLogin", handleUserLogin);
    return () => window.removeEventListener("userLogin", handleUserLogin);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/component/authentication/login");
  };

  const renderAuthButton = () => {
    if (user?.admin?.role === "Admin") {
      return (
        <div className="flex gap-2 items-center">
          <Link href="/deshboard">
            <Button>Dashboard</Button>
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1" /> Sign Out
          </Button>
        </div>
      );
    } else if (user?.data?.email) {
      return (
        <div className="flex md:gap-2 md:items-center justify-around">
          <Link
            className="md:px-10 py-2 bg-primary px-10 rounded-2xl text-2xl"
            href="/component/profile"
          >
            <ShoppingCart className="text-white" />
          </Link>
          <Link
            className="md:px-10 py-2 bg-primary px-10 rounded-2xl text-2xl"
            href="/component/my_services"
          >
            <MdBuild className="text-white" />
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1" /> Sign Out
          </Button>
        </div>
      );
    } else {
      return (
        <Link href="/component/authentication/login">
          <Button>LogIn</Button>
        </Link>
      );
    }
  };

  // 🔹 Close mobile menu when any link is clicked
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-2 relative z-50">
      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden">
        <Button>Brand</Button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2"
        >
          {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center">
        <Button>Brand</Button>
        <NavigationMenu className="ml-28" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      title={service.title}
                      href={service.href}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href={"/component/products/all_products"}>
                  Buy Product
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[400px] md:grid-cols-2 font-thin">
                  {products.map((product) => (
                    <li key={product.title} className="w-[200px]">
                      <Link
                        href={`/component/products/all_products/category/${product.title}`}
                        className="flex justify-between p-2 hover:bg-gray-100 rounded"
                      >
                        {product.title}{" "}
                        <ChevronRight className="font-thin text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/component/contact_us">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {renderAuthButton()}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-2 md:hidden bg-gray-50 p-3 rounded-lg">
          <Link
            href="/"
            className="font-medium"
            onClick={handleMobileLinkClick}
          >
            Home
          </Link>

          {/* Services */}
          <button
            onClick={() => toggleDropdown("services")}
            className="flex justify-between items-center font-medium"
          >
            Services <span>{openDropdown === "services" ? "-" : "+"}</span>
          </button>
          {openDropdown === "services" && (
            <div className="ml-4 flex flex-col gap-1 text-sm">
              {services.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  onClick={handleMobileLinkClick}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          )}

          {/* Products */}
          <button
            onClick={() => toggleDropdown("products")}
            className="flex justify-between items-center font-medium w-full"
          >
            <Link
              onClick={handleMobileLinkClick}
              href={"/component/products/all_products"}
            >
              Buy Product
            </Link>{" "}
            <span>{openDropdown === "products" ? "-" : "+"}</span>
          </button>
          {openDropdown === "products" && (
            <div className="ml-4 flex flex-col gap-1 text-sm">
              {products.map((p) => (
                <Link
                  key={p.title}
                  href={`/component/products/all_products/category/${p.title}`}
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                  onClick={handleMobileLinkClick} // ✅ Close dropdown & menu on click
                >
                  {p.title}
                </Link>
              ))}
            </div>
          )}

          {/* Contact */}
          <Link
            href="/contact"
            className="font-medium"
            onClick={handleMobileLinkClick}
          >
            Contact
          </Link>

          <div className="mt-4">{renderAuthButton()}</div>
        </div>
      )}
    </div>
  );
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
