import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1279, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 639, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="md:pt-20 pt-0 md:pb-0 pb-8">
      <div className="md:text-2xl text-xl font-bold mb-5">
        You Might Also Like
      </div>
      <Carousel
        responsive={responsive}
        containerClass="xl:-mx-3 -mx-2"
        itemClass="xl:px-3 px-2"
      >
        {products?.data?.map((p) => (
          <ProductCard key={p?.id} data={p} />
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
