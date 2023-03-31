import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ data: { attributes: p, id } }) => {
  return (
    <Link href={`/product/${p.slug}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-2 md:text-base text-sm text-gray-700 px-1">{p.name}</h3>
      <p className="md:text-lg text-base font-medium text-gray-900 px-1">
        NPr. {p.price}
      </p>
    </Link>
  );
};

export default ProductCard;
