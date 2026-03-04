import { useRouter } from 'next/router';

export default function BlogSlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <main>
      <h1>Blog Detail</h1>
      <p>Slug: {typeof slug === 'string' ? slug : ''}</p>
    </main>
  );
}
