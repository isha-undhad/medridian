import { blogPosts } from "@/data/blog";
import BlogCard from "./BlogCard";

type BlogGridProps = {
  limit?: number;
};

export default function BlogGrid({ limit }: BlogGridProps) {
  const posts = typeof limit === "number" ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} delay={(index % 3) * 0.08} />
      ))}
    </div>
  );
}
