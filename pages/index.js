import CategoryCard from "@/components/CategoryCard";
import HeroBanner from "@/components/HeroBanner";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useAuth } from "@/firebase/auth";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ products, categories }) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
  }, [authUser, isLoading]);

  return !authUser ? (
    <Loader />
  ) : (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* ---------------------------------------------- heading and paragraph start ---------------------------------------------- */}
        <div className="flex flex-col items-center justify-center gap-2 text-center pt-5 md:my-14 my-8 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Bringing the Restaurant to You
          </h1>
          <p className="md:text-base font-medium text-sm">
            We believe that everyone deserves the chance to enjoy the restaurant
            experience from the comfort of their own home. That's why we're
            dedicated to bringing the restaurant to you.
          </p>
        </div>

        {/* ----------------------- heading and paragraph end ----------------------- */}

        <div className="md:pt-14 pt-8">
          <h3 className="uppercase text-center text-sm text-[#00a34f]">
            categories
          </h3>
          <h1 className="text-center text-2xl md:text-3xl mb-3 font-semibold leading-tight">
            Shop by Category
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-3 md:my-14 my-8">
            {categories?.data?.map((category) => (
              <CategoryCard key={category?.id} data={category} />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------- product grid start ---------------------------------------------- */}
        <div className="md:pt-14 pt-8">
          <h3 className="uppercase text-center text-sm text-[#00a34f]">
            menus
          </h3>
          <h1 className="text-center text-2xl md:text-3xl mb-3 font-semibold leading-tight">
            Featured Menus
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:my-14 my-8">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        </div>
        {/* ----------------------- product grid end ----------------------- */}
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromApi(
    "/api/products?populate=*&pagination[limit]=12"
  );

  const categories = await fetchDataFromApi("/api/categories?populate=*");

  return {
    props: { products, categories },
  };
}
