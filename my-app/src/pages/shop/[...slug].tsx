import { useRouter } from "next/router";

const halamanToko = () => {
    const router = useRouter();
    // console.log(router);
    const {query} = useRouter();
  return (
    <div>
      <h1>Halaman Toko</h1>
      <p>Toko: </p>{`${query.slug && query.slug[0]+"-"+query.slug[1]}`}
    </div>
  );
};


export default halamanToko;
