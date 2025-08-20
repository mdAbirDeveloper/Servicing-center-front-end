/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, LogOut } from "lucide-react";
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
  {
    title: "Laptop Service",
    href: "/services/laptop",
    description: "Professional laptop repair and upgrades.",
  },
  {
    title: "PC Service",
    href: "/services/pc",
    description: "Complete PC maintenance & custom builds.",
  },
];

const products = [
  {
    title: "iPhone Parts",
    href: "/products/iphone-parts",
    description: "Original and high-quality spare parts for iPhones.",
  },
  {
    title: "Android Parts",
    href: "/products/android-parts",
    description: "Reliable spare parts for all major Android brands.",
  },
  {
    title: "Earbuds & Headphones",
    href: "/products/ear-accessories",
    description: "Wireless earbuds and premium headphones for all devices.",
  },
  {
    title: "Chargers & Cables",
    href: "/products/chargers-cables",
    description: "Fast chargers, data cables, and power adapters.",
  },
  {
    title: "PC & Laptop Accessories",
    href: "/products/pc-laptop-accessories",
    description: "External storage, keyboards, mice, and more.",
  },
];

export function NavigationMenuDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
    const router = useRouter();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    // তারপর login page এ redirect করুন
    router.push("/component/authentication/login");
  };

  const renderAuthButton = () => {
    if (user && user.admin?.role === "Admin") {
      return (
        <div className="flex gap-2 items-center">
          <Link href="/deshboard" className="font-medium">
            <Button>Dashboard</Button>
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1" /> Sign Out
          </Button>
        </div>
      );
    } else {
      return (
        <Link href="/component/authentication/login" className="font-medium">
          <Button>LogIn</Button>
        </Link>
      );
    }
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
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Services */}
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

            {/* Buy Product */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Buy Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {products.map((product) => (
                    <ListItem
                      key={product.title}
                      title={product.title}
                      href={product.href}
                    >
                      {product.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {renderAuthButton()}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-2 md:hidden bg-gray-50 p-3 rounded-lg">
          <Link href="/" className="font-medium">
            Home
          </Link>

          {/* Services */}
          <button
            onClick={() => toggleDropdown("services")}
            className="flex justify-between items-center font-medium"
          >
            Services
            <span>{openDropdown === "services" ? "-" : "+"}</span>
          </button>
          {openDropdown === "services" && (
            <div className="ml-4 flex flex-col gap-1 text-sm">
              {services.map((s) => (
                <Link key={s.title} href={s.href}>
                  {s.title}
                </Link>
              ))}
            </div>
          )}

          {/* Buy Product */}
          <button
            onClick={() => toggleDropdown("products")}
            className="flex justify-between items-center font-medium"
          >
            Buy Product
            <span>{openDropdown === "products" ? "-" : "+"}</span>
          </button>
          {openDropdown === "products" && (
            <div className="ml-4 flex flex-col gap-1 text-sm">
              {products.map((p) => (
                <Link key={p.title} href={p.href}>
                  {p.title}
                </Link>
              ))}
            </div>
          )}

          {/* Contact */}
          <Link href="/contact" className="font-medium">
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
