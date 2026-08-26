import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/blog/BlogPostView";
import { blogPosts } from "@/data/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every post at build time — add an entry to blogPosts in
// data/blog.ts and its route is picked up here automatically, same pattern
// as the /portfolio/[category] pages.
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} — Meridian Studio`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
