import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { site } from "@/config/site";
import { InstagramIcon } from "@/features/products/components/icons/instagram-icon";
import { WhatsappIcon } from "@/features/products/components/icons/whatsapp-icon";
import { ProductImagesGallery } from "@/features/products/components/product-images-gallery";
import { productBySlugOptions } from "@/features/products/products.queries";

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params }) => {
    const product = await queryClient.ensureQueryData(
      productBySlugOptions({ slug: params.slug }),
    );

    if (!product) throw notFound();
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: product } = useSuspenseQuery(
    productBySlugOptions({ slug: params.slug }),
  );

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const messageToBeShared = encodeURIComponent(
    `I am interested to buy ${product.name}\n\n${site.url}/${product.slug}`,
  );

  return (
    <section className="container grid gap-8 py-4 md:grid-cols-2 md:py-6 lg:gap-16 lg:py-8">
      <ProductImagesGallery
        images={product.images}
        inSale={Boolean(product.salePrice)}
        activeImageIndex={activeImageIndex}
        onActiveImageChange={setActiveImageIndex}
      />

      <div className="space-y-4 lg:space-y-6">
        <div className="space-y-2">
          {product.category && (
            <Link
              to="/products"
              search={{ categories: [product.category.slug] }}
              className="text-primary hover:text-primary/80 text-sm font-medium transition"
            >
              {product.category.name}
            </Link>
          )}

          <h2 className="text-2xl font-semibold text-balance md:text-3xl">
            {product.name}
          </h2>
        </div>
        <Separator />

        <div className="flex items-center gap-4">
          {product.salePrice ? (
            <>
              <p className="text-3xl font-bold text-gray-900">
                MRP Rs. {product.salePrice.toLocaleString()}
              </p>
              <p className="text-xl text-gray-500 line-through">
                Rs. {product.price.toLocaleString()}
              </p>
              <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
                {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <p className="text-3xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </p>
          )}
        </div>

        <p>{product.description}</p>
        <div className="grid gap-1">
          <div className="grid gap-2 lg:grid-cols-2">
            <Button
              size="lg"
              asChild
              className="bg-green-500 transition duration-200 hover:bg-green-600"
            >
              <Link
                to="."
                href={`https://wa.me/9779800000000?text=${messageToBeShared}`}
                target="_blank"
              >
                <WhatsappIcon className="fill-white" />
                <span>WhatsApp for Buying</span>
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-red-500 transition duration-200 hover:bg-red-600"
            >
              <Link
                to="."
                href={`https://ig.me/m/username?text=${messageToBeShared}`}
                target="_blank"
              >
                <InstagramIcon className="fill-white" />
                <span>Instagram for Buying</span>
              </Link>
            </Button>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
            Distributed by Carry Karma
          </p>
        </div>
      </div>
    </section>
  );
}
