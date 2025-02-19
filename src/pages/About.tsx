
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
          <div className="prose prose-lg">
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to AlphaPower! We're passionate about providing high-quality
              products and exceptional customer service.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              Founded in 2024, we've been committed to bringing you the best
              selection of products at competitive prices. Our team works tirelessly
              to ensure your shopping experience is seamless and enjoyable.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              We strive to provide our customers with an outstanding shopping
              experience, offering carefully curated products and exceptional
              customer service.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <p className="text-muted-foreground mb-6">
              AlphaPower is a registered entity in Costa Rica with a team based across 
              South America. Our headquarters in Costa Rica at Avenida Central 25, 
              San José 10101, Costa Rica are happy to answer your questions and provide support.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <p className="text-muted-foreground mb-6">
              We ship to all countries across Europe and the majority of the globe, 
              ensuring our premium supplements reach fitness enthusiasts worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
