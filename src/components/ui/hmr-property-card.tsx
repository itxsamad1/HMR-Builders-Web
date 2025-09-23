'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Define the props for the HMR Property Card component
interface HMRPropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  price: number;
  pricePeriod: string;
  status?: 'active' | 'coming-soon' | 'sold-out';
  roi?: string;
  tokens?: number;
  availableTokens?: number;
  onInvest: () => void;
}

const HMRPropertyCard = React.forwardRef<HTMLDivElement, HMRPropertyCardProps>(
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
      status = 'active',
      roi,
      tokens,
      availableTokens,
      onInvest,
      ...props
    },
    ref
  ) => {
    const getStatusColor = () => {
      switch (status) {
        case 'active':
          return 'bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] text-white';
        case 'coming-soon':
          return 'bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-white';
        case 'sold-out':
          return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
        default:
          return 'bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] text-white';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full max-w-sm overflow-hidden rounded-xl h-80",
          className
        )}
        {...props}
      >
        {/* Glowing Effect */}
        <GlowingEffect
          spread={30}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.3}
          borderWidth={2}
          variant="default"
        />
        
        {/* Card Content */}
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-xl",
            "bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]",
            "border border-[#14b8a6]/30 shadow-2xl shadow-[#14b8a6]/10",
            "transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-[#14b8a6]/20 hover:-translate-y-2",
            "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
            "before:bg-gradient-to-r before:from-[#14b8a6]/50 before:via-[#0ea5e9]/30 before:to-[#14b8a6]/50 before:-z-10"
          )}
        >
        {/* Background Image with Zoom Effect on Hover */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

        {/* Content Container - Always Visible on Image */}
        <div className="relative flex h-full flex-col p-6 text-white">
          {/* Top Section: Logo and Status - Fixed */}
          <div className="flex justify-between items-start mb-4">
            {logo && (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm">
                {logo}
              </div>
            )}
            <Badge className={`text-xs shadow-lg ${getStatusColor()}`}>
              {status === 'active' ? 'ACTIVE' : status === 'coming-soon' ? 'COMING SOON' : 'SOLD OUT'}
            </Badge>
          </div>
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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
            
            {/* Property Stats - Always Visible */}
            {(roi || tokens || availableTokens) && (
              <div className="grid grid-cols-3 gap-2 text-xs">
                {roi && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <span className="text-white/60 block">ROI</span>
                    <p className="text-green-400 font-semibold">{roi}</p>
                  </div>
                )}
                {tokens && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <span className="text-white/60 block">Tokens</span>
                    <p className="text-white font-semibold text-xs">{tokens.toLocaleString()}</p>
                  </div>
                )}
                {availableTokens && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <span className="text-white/60 block">Available</span>
                    <p className="text-[#14b8a6] font-semibold text-xs">{availableTokens.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}

            </div>
          </div>
          
          {/* Bottom Section: Price and Button - Fixed at Bottom */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-white/20 mt-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-white">PKR {price.toLocaleString()}</span>
                <span className="text-white/80 text-sm ml-1">{pricePeriod}</span>
              </div>
              <Button 
                onClick={onInvest} 
                size="sm" 
                className="bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] hover:from-[#0f9488] hover:to-[#0284c7] text-white shadow-lg shadow-[#14b8a6]/30 text-xs"
                disabled={status === 'sold-out'}
              >
                {status === 'sold-out' ? 'Sold Out' : 'Invest Now'} 
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
);
HMRPropertyCard.displayName = "HMRPropertyCard";

export { HMRPropertyCard };
