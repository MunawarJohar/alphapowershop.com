import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { RecommendedProducts } from "@/components/RecommendedProducts";

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const handlePlaceOrder = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    if (!city) {
      toast.error("Please enter your city");
      return;
    }

    if (!postalCode) {
      toast.error("Please enter your postal code");
      return;
    }

    if (!country) {
      toast.error("Please enter your country");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        name,
        email,
        address,
        city,
        postal_code: postalCode,
        country,
        total,
        items: state.items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) {
        throw error;
      }

      dispatch({ type: "CLEAR_CART" });
      toast.success("Order placed successfully!");
      navigate('/thank-you', { state: { total } });
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
              {state.items.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          €{item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <RecommendedProducts 
                currentItems={state.items.map(item => item.id)}
              />
            </div>
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Street Address
                  </label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="postalCode" className="text-sm font-medium">
                    Postal Code
                  </label>
                  <Input
                    id="postalCode"
                    type="text"
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country
                  </label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Enter your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={state.items.length === 0 || isSubmitting}
                  onClick={handlePlaceOrder}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
