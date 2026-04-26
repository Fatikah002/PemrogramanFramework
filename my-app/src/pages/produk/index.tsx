import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import { ProductType } from "../../types/Product.type";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("../../views/produk/sections/HeroSection"));

const kategori = () => {
  // // const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // // console.log("products:", products);

  // // useEffect(() => {
  // //   if (isLogin) {
  // //     push("/auth/login");
  // //   }
  // // }, []);

  const { data, isLoading } = useSWR("/api/produk", fetcher);
  // const products = data?.data;
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
      {/* <TampilanProduk products={isLoading ? [] : data.data} /> */}
      <TampilanProduk products={isLoading ? [] : data?.data} />
    </div>
  );
};

export default kategori;
