
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

interface Review {
  text: string;
  author: string;
  rating: number;
}

export interface ProductReview {
  id: number;
  reviews: Review[];
}

const countries = [
  { name: "UK", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "USA", flag: "🇺🇸" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "France", flag: "🇫🇷" },
  { name: "Spain", flag: "🇪🇸" },
];

export const productReviews: ProductReview[] = [
  {
    id: 1,
    reviews: [
      { text: "Amazing results within weeks! Highly recommended.", author: countries[0].flag + " Customer from UK", rating: 4.5 },
      { text: "Best supplement I've tried so far.", author: countries[2].flag + " Customer from USA", rating: 4.8 },
      { text: "Great quality and fast shipping.", author: countries[1].flag + " Customer from Germany", rating: 4.6 },
    ],
  },
  {
    id: 2,
    reviews: [
      { text: "Perfect for cutting phase. Lost 5kg in a month!", author: countries[3].flag + " Customer from Netherlands", rating: 4.7 },
      { text: "Effective and no side effects.", author: countries[4].flag + " Customer from France", rating: 4.5 },
      { text: "Really helps with appetite control.", author: countries[5].flag + " Customer from Spain", rating: 4.4 },
    ],
  },
  {
    id: 3,
    reviews: [
      { text: "Gained 3kg of lean mass in 2 months.", author: countries[2].flag + " Customer from USA", rating: 4.8 },
      { text: "Great taste and mixes well.", author: countries[1].flag + " Customer from Germany", rating: 4.6 },
      { text: "Excellent results, will buy again.", author: countries[0].flag + " Customer from UK", rating: 4.7 },
    ],
  },
];

// Fixed product ratings
const productRatings = {
  1: 4.6,
  2: 4.7,
  3: 4.8,
  4: 4.7,
  5: 4.8,
  6: 4.6,
  7: 4.5,
  8: 4.7,
  9: 4.6
};

export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-primary text-primary" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-primary text-primary" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
    </div>
  );
}

export function getProductRating(productId: number): number {
  return productRatings[productId as keyof typeof productRatings] || 4.5;
}

export function ReviewCarousel({ productId }: { productId: number }) {
  const product = productReviews.find((p) => p.id === productId);
  
  if (!product) return null;

  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {product.reviews.map((review, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-6">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-muted-foreground">{review.text}</p>
                <p className="mt-2 text-sm font-medium">{review.author}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
