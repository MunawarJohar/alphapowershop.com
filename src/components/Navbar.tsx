
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-background border-b relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => isMobile && setIsMenuOpen(!isMenuOpen)}
              className="text-xl font-bold flex items-center"
            >
              <span>AlphaPower</span>
              {isMobile && <Menu className="ml-2 h-5 w-5" />}
            </button>
            <div className="hidden md:flex space-x-4">
              <Link to="/products">
                <Button variant="ghost">Products</Button>
              </Link>
              <Link to="/blog">
                <Button variant="ghost">Blog</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
            </div>
          </div>
          <Link to="/checkout">
            <Button variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({itemCount})
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b shadow-lg z-50">
            <div className="py-2">
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Products
                </Button>
              </Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Blog
                </Button>
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  About
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
