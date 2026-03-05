import { useRouter } from "next/router";

const CategoryCatchAll = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null;
  return (
    <div>
      <h3>Daftar Parameter URL:</h3>
      <ul>
        {slug.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCatchAll;
