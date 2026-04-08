// import { useRouter } from "next/router";
// // import { useEffect, useState } from "react";
import TampilanProduk from "../../views/produk";
import HeroSection from "../../views/produk/sections/HeroSection";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const kategori = () => {
  // // const [isLogin, setIsLogin] = useState(false);
  // // const { push } = useRouter();
  // const [products, setProducts] = useState<ProductType[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // // console.log("products:", products);

  // // useEffect(() => {
  // //   if (isLogin) {
  // //     push("/auth/login");
  // //   }
  // // }, []);

  const { data, isLoading, isValidating } = useSWR<{ data: ProductType[] }>(
    "/api/produk",
    fetcher
  );
  const products = data?.data;
  // cek apakah data, error, dan isLoading sudah benar
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("/api/produk")
  //     .then((response) => response.json())
  //     .then((responsedata) => {
  //       setProducts(responsedata.data);
  //       // console.log("Data produk:", responsedata.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching produk:", error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <div>
      <HeroSection />
      <TampilanProduk
        products={products}
        isLoading={isLoading || isValidating}
      />
    </div>
  );
};

export default kategori;
