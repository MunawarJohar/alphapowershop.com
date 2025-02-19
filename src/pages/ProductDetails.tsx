
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { NewsletterDialog } from "@/components/NewsletterDialog";
import { ReviewCarousel, StarRating } from "@/components/ReviewCarousel";

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Link to="/products">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-8">Product Not Found</h1>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <StarRating rating={Number((Math.random() * (4.8 - 4.3) + 4.3).toFixed(1))} />
            <p className="text-2xl font-bold text-primary">
              €{product.price.toFixed(2)}
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <ReviewCarousel productId={product.id} />
        </div>
      </div>
      <NewsletterDialog />
    </div>
  );
};

export default ProductDetails;
