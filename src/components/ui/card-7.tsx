'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Define the props for the TravelCard component
interface TravelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  price: number;
  pricePeriod: string;
  onBookNow: () => void;
}

const TravelCard = React.forwardRef<HTMLDivElement, TravelCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      price,
      pricePeriod,
      onBookNow,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-lg h-80",
          "transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
          className
        )}
        {...props}
      >
        {/* Background Image with Zoom Effect on Hover */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Content Container - Always Visible on Image */}
        <div className="relative flex h-full flex-col justify-between p-6 text-white">
          {/* Top Section: Logo */}
          <div className="flex justify-start">
             {logo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm">
                   {logo}
                </div>
             )}
          </div>
          
          {/* Bottom Section: Main Content - Always Visible */}
          <div className="space-y-3">
            <div>
              <h3 className="text-3xl font-bold text-white leading-tight">{title}</h3>
              <p className="text-sm text-white/90 mt-1">{location}</p>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">OVERVIEW</h4>
              <p className="text-sm text-white/90 leading-relaxed">
                {overview}
              </p>
            </div>

            {/* Price and Button - Revealed on Hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-white/20">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">${price}</span>
                  <span className="text-white/80 text-sm ml-1">{pricePeriod}</span>
                </div>
                <Button onClick={onBookNow} size="sm" className="bg-white text-black hover:bg-white/90 text-xs">
                  Book Now <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TravelCard.displayName = "TravelCard";

export { TravelCard };