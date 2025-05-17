import { LinkProps } from "@tanstack/react-router";

export const navLinks: { href: LinkProps["to"]; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const site = {
  name: "Janani Trade",
  version: "1.0.0",
  description:
    "Your trusted source for fresh groceries, daily essentials, and household products. Quality and convenience delivered to your door.",
  keywords:
    "groceries, fresh produce, daily essentials, household items, fruits, vegetables, Janani Trade",
  url: "https://jananitrade.com",
  facebook: "https://www.facebook.com/jananitrade",
  instagram: "https://www.instagram.com/jananitrade",
  streetAddress: "Newroad opposite of Bira Complex",
  addressLocality: "Kathmandu",
  addressRegion: "Bagmati",
  postalCode: "44600",
  addressCountry: "NP",
  telephone: "01-5353733, +977-9841326275",
  foundingDate: "2020-01-01",
};
