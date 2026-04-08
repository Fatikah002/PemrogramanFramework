import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";
import HeroSection from "../../views/produk/sections/HeroSection";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <HeroSection />
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukStatic;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/produk");
  //const resrponse: ProductType[] = await res.json();
  const response: { data: ProductType[] } = await res.json();
  //console.log("Data produk yang diambil dari API:", response);
  return {
    props: {
      products: response.data,
    },
    revalidate: 10, // Revalidate data setiap 10 detik
  };
}
