'use client'

import { TravelCard } from "@/components/ui/card-7";
import { Building2, MapPin, Mountain } from "lucide-react";
import { Toaster, toast } from "sonner";
import { FlickeringGrid } from '@/components/ui/flickering-grid';

export default function TravelCardDemo() {
  const handleBooking = (propertyName: string) => {
    toast.success(`Investment initiated for ${propertyName}!`, {
      description: "Redirecting to investment page...",
    });
  };

  return (
    <>
      <Toaster richColors />
      <div className="min-h-screen bg-gradient-to-br from-[#0a1426] to-[#1a2332] relative overflow-hidden">
        {/* Flickering Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <FlickeringGrid
            squareSize={4}
            gridGap={6}
            flickerChance={0.3}
            color="rgb(20, 184, 166)"
            maxOpacity={0.4}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* HMR Property Card 1 - H1 Tower */}
            <TravelCard
              imageUrl="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Modern luxury tower with city skyline"
              logo={<Building2 className="h-6 w-6 text-white/80" />}
              title="H1 Tower"
              location="HMR Waterfront, Karachi, Pakistan"
              overview="Premium residential tower offering luxury living with stunning city views. Features modern amenities, 24/7 security, and prime location in Karachi's financial district."
              price={2500000}
              pricePeriod="PKR Investment"
              onBookNow={() => handleBooking("H1 Tower")}
              aria-label="Investment card for H1 Tower"
              className="h-96"
            />

            {/* HMR Property Card 2 - Saima Tower */}
            <TravelCard
              imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Glass commercial building with blue reflections"
              logo={<Building2 className="h-6 w-6 text-white/80" />}
              title="Saima Tower"
              location="HMR Waterfront, Karachi, Pakistan"
              overview="Ultra-luxury commercial and residential complex. State-of-the-art facilities with smart building technology and sustainable design for modern urban living."
              price={1750000}
              pricePeriod="PKR Investment"
              onBookNow={() => handleBooking("Saima Tower")}
              aria-label="Investment card for Saima Tower"
              className="h-96"
            />

            {/* HMR Property Card 3 - A4 Waterfront */}
            <TravelCard
              imageUrl="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Waterfront building at sunset with ocean view"
              logo={<MapPin className="h-6 w-6 text-white/80" />}
              title="A4 Waterfront"
              location="HMR Waterfront, Karachi, Pakistan"
              overview="Exclusive waterfront development with panoramic sea views. Premium location offering luxury lifestyle with private beach access and world-class amenities."
              price={1750000}
              pricePeriod="PKR Investment"
              onBookNow={() => handleBooking("A4 Waterfront")}
              aria-label="Investment card for A4 Waterfront"
              className="h-96"
            />

            {/* Bonus Travel Card - Nature Retreat */}
            <TravelCard
              imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Misty mountains over a serene lake"
              logo={<Mountain className="h-6 w-6 text-white/80" />}
              title="Northern Retreat"
              location="Hunza Valley, Northern Pakistan"
              overview="Discover nature's paradise where spacious accommodations, scenic trails, and cozy campfires await. Perfect for families, friends, and solo adventurers seeking tranquility."
              price={25000}
              pricePeriod="PKR Per Night"
              onBookNow={() => handleBooking("Northern Retreat")}
              aria-label="Travel card for Northern Retreat"
              className="h-96"
            />

            {/* Bonus Travel Card - Desert Camp */}
            <TravelCard
              imageUrl="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Desert landscape with golden dunes"
              logo={<Mountain className="h-6 w-6 text-white/80" />}
              title="Desert Safari Camp"
              location="Thar Desert, Sindh, Pakistan"
              overview="Experience the mystique of the desert with luxury camping under starlit skies. Traditional hospitality meets modern comfort in this unique desert adventure."
              price={18000}
              pricePeriod="PKR Per Night"
              onBookNow={() => handleBooking("Desert Safari Camp")}
              aria-label="Travel card for Desert Safari Camp"
              className="h-96"
            />

            {/* Bonus Travel Card - Mountain Lodge */}
            <TravelCard
              imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Mountain lodge with snow-capped peaks"
              logo={<Mountain className="h-6 w-6 text-white/80" />}
              title="Alpine Lodge"
              location="Skardu, Gilgit-Baltistan, Pakistan"
              overview="High-altitude luxury lodge offering breathtaking views of K2 and surrounding peaks. Perfect base for trekking adventures and mountain photography expeditions."
              price={35000}
              pricePeriod="PKR Per Night"
              onBookNow={() => handleBooking("Alpine Lodge")}
              aria-label="Travel card for Alpine Lodge"
              className="h-96"
            />

          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center py-8">
          <p className="text-white/60 text-sm">
            HMR Builders - Premium Real Estate & Travel Experiences
          </p>
        </div>
      </div>
    </>
  );
}
