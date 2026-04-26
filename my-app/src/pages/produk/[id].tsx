import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType | null }) => {
// const HalamanProduk = () => {
  // digunakan client-side rendering
//   const { query } = useRouter();
//   const productId = typeof query.id === "string" ? query.id : undefined;
//   const { data, error, isLoading } = useSWR(
//     productId ? `/api/products/${productId}` : null,
//     fetcher,
//   );

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Gagal memuat data produk.</div>;
//   }

//   const product = (data?.data ?? null) as ProductType | null;

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

// digunakan server-side rendering
export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
  const response: { data: ProductType | null } = await res.json();
  return {
    props: {
      product: response?.data ?? null,
    },
  };
}

// digunakan static-site generation
// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
//   const response: { data: ProductType[] } = await res.json();

//   const paths = response.data.map((product: ProductType) => ({
//     params: { id: product.id },
//   }));
//   // console.log("Paths yang dihasilkan untuk produk:", paths); // Debugging: Tampilkan paths yang dihasilkan
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
//   const response: { data: ProductType | null } = await res.json();

//   return {
//     props: {
//       product: response?.data ?? null,
//     },
//   };
// }
