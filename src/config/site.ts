import { LinkProps } from "@tanstack/react-router";

export const navLinks: { href: LinkProps["to"]; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
