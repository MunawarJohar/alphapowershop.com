
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { toast } from "sonner";
import { NewsletterDialog } from "@/components/NewsletterDialog";

const BlogPost = () => {
  const { slug } = useParams();
  const { dispatch } = useCart();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
      toast.success(`${product.name} added to cart`);
    }
  };

  const featuredProductDetails = blog.featuredProduct 
    ? products.find(p => p.id === blog.featuredProduct.id)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          {blog.content.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground mb-4">
              {paragraph}
            </p>
          ))}
        </article>

        {blog.featuredProduct && featuredProductDetails && (
          <div className="mt-12 bg-card rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Featured Product</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={featuredProductDetails.image}
                alt={featuredProductDetails.name}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold">{featuredProductDetails.name}</h3>
                <p className="text-muted-foreground">{featuredProductDetails.description}</p>
                <p className="font-bold">€{featuredProductDetails.price.toFixed(2)}</p>
                <div className="flex gap-4">
                  <Link to={`/products/${featuredProductDetails.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                  <Button onClick={() => handleAddToCart(featuredProductDetails.id)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <NewsletterDialog />
    </div>
  );
};

export default BlogPost;
