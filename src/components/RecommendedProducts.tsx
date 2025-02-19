
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface RecommendedProductsProps {
  currentItems: number[];
  count?: number;
}

// Fixed recommendations map for each product
const productRecommendations: { [key: number]: number[] } = {
  1: [2, 7], // Rock Hard -> Lean Down, Tanning Pro
  2: [3, 8], // Lean Down -> Full Bulk, MassBulk Pro
  3: [5, 8], // Full Bulk -> Strength Gain Max, MassBulk Pro
  4: [2, 7], // Cut Pro -> Lean Down, Tanning Pro
  5: [3, 8], // Strength Gain Max -> Full Bulk, MassBulk Pro
  6: [1, 9], // Rock Hard Pro -> Rock Hard, Finasteride
  7: [2, 4], // Tanning Pro -> Lean Down, Cut Pro
  8: [3, 5], // MassBulk Pro -> Full Bulk, Strength Gain Max
  9: [1, 6], // Finasteride -> Rock Hard, Rock Hard Pro
};

export function RecommendedProducts({ currentItems, count = 2 }: RecommendedProductsProps) {
  const { dispatch } = useCart();

  // Get recommendations based on current items
  const getRecommendations = () => {
    const recommendations = new Set<number>();
    
    currentItems.forEach(itemId => {
      const recs = productRecommendations[itemId] || [];
      recs.forEach(recId => {
        if (!currentItems.includes(recId)) {
          recommendations.add(recId);
        }
      });
    });

    // If no recommendations from the map, provide default recommendations
    if (recommendations.size === 0) {
      return [products[1], products[2]].filter(p => !currentItems.includes(p.id));
    }

    return Array.from(recommendations)
      .slice(0, count)
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);
  };

  const recommendedProducts = getRecommendations();

  if (recommendedProducts.length === 0) return null;

  const handleAddToCart = (product: typeof products[0]) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="bg-card rounded-lg shadow-md p-4">
            <Link to={`/products/${product.id}`}>
              <div className="relative w-full h-32 mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute w-full h-full object-cover rounded-md hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">€{product.price.toFixed(2)}</span>
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
