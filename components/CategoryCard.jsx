import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ data: { attributes: c, id } }) => {
  return (
    <Link
      href={`/category/${c.slug}`}
      className="group border bg-gray-100 flex items-center justify-center rounded-md py-4 hover:border-black"
    >
      <p className="md:text-lg text-base font-medium text-gray-900 px-1">
        {c.name}
      </p>
    </Link>
  );
};

export default CategoryCard;
