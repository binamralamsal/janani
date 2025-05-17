import { Product, WithContext } from "schema-dts";

import { Link } from "@tanstack/react-router";

import { PlaceholderImage } from "@/components/placeholder-image";

import { site } from "@/config/site";
import { cn } from "@/util/cn";

type ProductCardProps = {
  name: string;
  price: number;
  salePrice: number | null;
  slug: string;
  category: string | null;
  images: Partial<{ url: string }[]>;
};

export function ProductCard(props: ProductCardProps) {
  const productUrl = `/products/${props.slug}`;

  const firstImage = props.images[0];
  const secondImage = props.images[1];
  const discount = props.salePrice
    ? Math.round(((props.price - props.salePrice) / props.price) * 100)
    : 0;

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.name,
    image: firstImage?.url || "/file.svg",
    description: `Buy ${props.name} at a great price!`,
    sku: props.slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "NPR",
      price: props.salePrice || props.price,
      url: productUrl,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        merchantReturnDays: 7,
      },
      availability: "InStock",
      seller: {
        "@type": "Organization",
        name: site.name,
      },
    },
    category: props.category || "General",
  };

  return (
    <div>
      <Link to={productUrl} className="group relative block">
        {firstImage ? (
          <img
            src={firstImage?.url || "/file.svg"}
            alt={`${props.name}`}
            width={600}
            height={600}
            className={cn(
              "h-96 w-full object-cover transition duration-500",
              secondImage && "group-hover:opacity-0",
            )}
          />
        ) : (
          <PlaceholderImage className="h-96 w-full object-cover" />
        )}

        {secondImage && (
          <img
            src={secondImage.url}
            alt={`${props.name}`}
            width={600}
            height={600}
            className={cn(
              "absolute top-0 left-0 h-96 w-full object-cover opacity-0 transition duration-500",
              secondImage && "group-hover:opacity-100",
            )}
          />
        )}

        {props.salePrice && (
          <div className="bg-primary text-primary-foreground absolute top-4 left-0 px-4 py-1 text-sm uppercase">
            {discount}% off
          </div>
        )}
      </Link>

      <div className="mt-4 md:mt-6">
        {props.category && (
          <div className="text-muted-foreground text-sm">{props.category}</div>
        )}
        <Link to={productUrl} className="block font-semibold tracking-tight">
          {props.name}
        </Link>
        <div className="text-gray-700">
          {props.salePrice ? (
            <s className="text-gray-500">Rs. {props.price.toLocaleString()}</s>
          ) : (
            <span>Rs. {props.price.toLocaleString()}</span>
          )}

          {props.salePrice && (
            <span className="text-primary ml-2">
              MRP Rs. {props.salePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
