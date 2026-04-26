import { link } from "node:fs";
import styles from "../../pages/produk/product.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({
  products,
  isLoading,
}: {
  products?: ProductType[];
  isLoading?: boolean;
}) => {
  const skeletonItems = [1, 2, 3, 4, 5];
  const resolvedIsLoading = isLoading ?? products === undefined;
  const safeProducts = products ?? [];

  return (
    <div className={styles.produk}>
      <h1 data-testid="title" className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {resolvedIsLoading ? (
          <>
            {skeletonItems.map((item) => (
              <div key={item} className={styles.produk__content__skeleton}>
                <div className={styles.produk__content__skeleton__image}></div>
                <div className={styles.produk__content__skeleton__name}></div>
                <div
                  className={styles.produk__content__skeleton__category}
                ></div>
                <div className={styles.produk__content__skeleton__price}></div>
              </div>
            ))}
          </>
        ) : safeProducts?.length > 0 ? (
          <>
            {safeProducts?.map((products: ProductType) => (
              <Link href={`/produk/${products.id}`} key={products.id} className={styles.produk__content__item}>
              {/* <div key={products.id} className={styles.produk__content__item}> */}
                <div className={styles.produk__content__item__image}>
                  <Image src={products.image} alt={products.name} width={200} height={200} />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {products.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  {products.category}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {products.price.toLocaleString("id-ID")}
                </p>
              {/* </div> */}
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.produk__content__empty}>
            Produk tidak tersedia.
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
