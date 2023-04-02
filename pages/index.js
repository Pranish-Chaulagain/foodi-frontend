import HeroBanner from "@/components/HeroBanner";
import NewsLetter from "@/components/NewsLetter";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

export default function Home({ products }) {
  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* ---------------------------------------------- heading and paragraph start ---------------------------------------------- */}
        <div className="flex items-center py-10 px-10 gap-5 rounded-lg mt-5">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Bringing the Restaurant to You
            </h1>
            <p className="md:text-base font-medium text-sm">
              We believe that everyone deserves the chance to enjoy the
              restaurant experience from the comfort of their own home. That's
              why we're dedicated to bringing the restaurant to you.
            </p>
          </div>
        </div>

        {/* ----------------------- heading and paragraph end ----------------------- */}

        {/* ---------------------------------------------- product grid start ---------------------------------------------- */}
        <div className="pt-20">
          <h3 className="uppercase text-center text-sm text-[#00a34f]">
            menus
          </h3>
          <h1 className="text-center text-2xl md:text-3xl mb-3 font-semibold leading-tight">
            Featured Menus
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-3 my-14">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        </div>
        {/* ----------------------- product grid end ----------------------- */}
      </Wrapper>
      <NewsLetter />
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromApi(
    "/api/products?populate=*&pagination[limit]=12"
  );

  return {
    props: { products },
  };
}
