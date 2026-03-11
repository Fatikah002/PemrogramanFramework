import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProductType = {
  id        : string;
  name      : string;
  price     : number;
  size      : string;
  category  : string;
};

const kategori= () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const { push } = useRouter();
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, []);

const fetchProducts = () => {
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("Data produk:", responseData.data);
        setProducts(responseData.data);
      })
      .catch((error) => {
        console.error("Error fetching produk:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <button type="button" onClick={fetchProducts} >
      Refresh Data
      </button>
      {products.map((products:ProductType) => (
        <div key={products.id}>
          <h2>{products.name}</h2>
          <p>Harga: {products.price}</p>
          <p>Ukuran: {products.size}</p>
          <p>Kategori: {products.category}</p>  
        </div>
      ))} 
      
    </div>
  );
};

export default kategori;
