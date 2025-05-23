import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { allCategoriesOptions } from "@/features/products/products.queries";

export function SiteFooter() {
  const {
    data: { categories },
  } = useSuspenseQuery(
    allCategoriesOptions({ values: { page: 1, pageSize: 10 } }),
  );
  return (
    <>
      <footer className="bg-footer-background text-primary-foreground dark:text-foreground pt-16">
        <div className="container">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center space-x-2">
                <p className="text-xl font-semibold">Janani Trade</p>
              </div>
              <p className="text-primary-foreground/80 dark:text-foreground/80 mb-6 leading-relaxed">
                Dedicated to providing top-quality groceries with a holistic
                approach that focuses on nourishing the whole person, not just
                filling the pantry.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="hover:bg-primary hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="hover:bg-primary hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="hover:bg-primary hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="hover:bg-primary hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary-foreground text-primary-foreground/80 dark:text-foreground/80 dark:hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-primary-foreground text-primary-foreground/80 dark:text-foreground/80 dark:hover:text-primary transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary-foreground text-primary-foreground/80 dark:text-foreground/80 dark:hover:text-primary transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-primary-foreground text-primary-foreground/80 dark:text-foreground/80 dark:hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to="/products"
                      className="hover:text-primary-foreground text-primary-foreground/80 dark:text-foreground/80 dark:hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <MapPin className="text-primary-foreground dark:text-foreground mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="text-primary-foreground/80 dark:text-foreground/80">
                    123 Business Avenue, Suite 500, New York, NY 10001
                  </span>
                </li>
                <li className="flex">
                  <Phone className="text-primary-foreground dark:text-foreground mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="text-primary-foreground/80 dark:text-foreground/80">
                    +1 (555) 123-4567
                  </span>
                </li>
                <li className="flex">
                  <Mail className="text-primary-foreground dark:text-foreground mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="text-primary-foreground/80 dark:text-foreground/80">
                    janani@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-primary-foreground dark:text-foreground border-t border-white/10 py-8 text-center text-sm dark:border-white/25">
            <p>
              © {new Date().getFullYear()} Janani Trade. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
