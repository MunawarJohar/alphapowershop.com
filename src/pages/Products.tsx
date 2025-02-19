
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { NewsletterDialog } from "@/components/NewsletterDialog";
import { StarRating, getProductRating } from "@/components/ReviewCarousel";

const Products = () => {
  const { dispatch } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="bg-card rounded-lg shadow-md p-6">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4 hover:opacity-90 transition-opacity"
                />
                <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                  {product.name}
                </h2>
              </Link>
              <div className="mb-4">
                <StarRating rating={getProductRating(product.id)} />
              </div>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NewsletterDialog />
    </div>
  );
};

export default Products;
