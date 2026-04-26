// import { ProductType } from "@/types/Product.type";
import { ProductType } from "../../types/Product.type";
import Image from "next/image";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <>
      <h1 className={styles.title}>Detail Produk</h1>
      <div className={styles.produkdetail}>
        <div className={styles.produkdetail_image}>
          <Image
            src={products.image}
            alt={products.name}
            width={460}
            height={460}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className={styles.produkdetail_info}>
          <h1 className={styles.produkdetail_name}>{products.name}</h1>
          <p className={styles.produkdetail_category}>{products.category}</p>
          <p className={styles.produkdetail_price}>
            Rp {products.price && products.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;