
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { NewsletterDialog } from "@/components/NewsletterDialog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.slug}`}
              className="block transition-transform hover:-translate-y-1"
            >
              <div className="bg-card rounded-lg shadow-md p-6 h-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {blog.description}
                </p>
                <div className="flex items-center text-primary">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <NewsletterDialog />
    </div>
  );
};

export default Blog;
