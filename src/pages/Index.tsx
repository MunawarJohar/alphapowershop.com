import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { blogs } from "@/data/blogs";
import { NewsletterDialog } from "@/components/NewsletterDialog";
import { Suspense, lazy } from 'react';

const BlogCard = ({ blog }: { blog: typeof blogs[0] }) => (
  <Link to={`/blog/${blog.slug}`} className="block transition-transform hover:-translate-y-1">
    <div className="bg-card rounded-lg shadow-md p-6 h-full">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading="lazy"
        width="400"
        height="192"
      />
      <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
        {blog.title}
      </h3>
      <p className="text-muted-foreground mb-4">
        {blog.description}
      </p>
      <div className="flex items-center text-primary">
        Read More
        <ArrowRight className="ml-2 h-4 w-4" />
      </div>
    </div>
  </Link>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our amazing collection of products at unbeatable prices.
              Quality and satisfaction guaranteed.
            </p>
            <Link to="/products">
              <Button size="lg" className="font-semibold">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
      <NewsletterDialog />
    </div>
  );
};

export default Index;
