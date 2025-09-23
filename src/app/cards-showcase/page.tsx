'use client'

import { TravelCard } from "@/components/ui/card-7";
import { HMRPropertyCard } from "@/components/ui/hmr-property-card";
import { Building2, MapPin, Mountain, Home, TrendingUp } from "lucide-react";
import { Toaster, toast } from "sonner";
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CardsShowcase() {
  const handleBooking = (propertyName: string) => {
    toast.success(`Investment initiated for ${propertyName}!`, {
      description: "Redirecting to investment page...",
    });
  };

  const handleTravel = (destination: string) => {
    toast.success(`Booking initiated for ${destination}!`, {
      description: "Redirecting to booking page...",
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

        {/* Header */}
        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/portfolio">
                <Button variant="outline" className="border-[#14b8a6]/30 text-white hover:bg-[#14b8a6]/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Portfolio
                </Button>
              </Link>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">HMR Cards Showcase</h1>
                <p className="text-white/60">Integrated TravelCard & HMR Property Cards</p>
              </div>
              <div className="w-24"></div> {/* Spacer for center alignment */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-12">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* HMR Property Cards Section */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                  <Building2 className="w-8 h-8 mr-3 text-[#14b8a6]" />
                  HMR Property Investment Cards
                </h2>
                <p className="text-white/70">Premium real estate investment opportunities with futuristic design</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <HMRPropertyCard
                  imageUrl="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
                  imageAlt="Modern luxury tower with city skyline"
                  logo={<Building2 className="h-6 w-6 text-white/80" />}
                  title="H1 Tower"
                  location="HMR Waterfront, Karachi"
                  overview="Premium residential tower offering luxury living with stunning city views. Features modern amenities, 24/7 security, and prime location."
                  price={2500000}
                  pricePeriod="Investment"
                  status="active"
                  roi="18-22%"
                  tokens={1000}
                  availableTokens={342}
                  onInvest={() => handleBooking("H1 Tower")}
                  className="h-96"
                />

                <HMRPropertyCard
                  imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                  imageAlt="Glass commercial building with blue reflections"
                  logo={<TrendingUp className="h-6 w-6 text-white/80" />}
                  title="Saima Tower"
                  location="HMR Waterfront, Karachi"
                  overview="Ultra-luxury commercial and residential complex with state-of-the-art facilities and smart building technology."
                  price={1750000}
                  pricePeriod="Investment"
                  status="active"
                  roi="17-21%"
                  tokens={1000}
                  availableTokens={1000}
                  onInvest={() => handleBooking("Saima Tower")}
                  className="h-96"
                />

                <HMRPropertyCard
                  imageUrl="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
                  imageAlt="Waterfront building at sunset with ocean view"
                  logo={<MapPin className="h-6 w-6 text-white/80" />}
                  title="A4 Waterfront"
                  location="HMR Waterfront, Karachi"
                  overview="Exclusive waterfront development with panoramic sea views and private beach access."
                  price={1750000}
                  pricePeriod="Investment"
                  status="coming-soon"
                  roi="20-25%"
                  tokens={1000}
                  availableTokens={1000}
                  onInvest={() => handleBooking("A4 Waterfront")}
                  className="h-96"
                />
              </div>
            </section>

            {/* Travel Cards Section */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                  <Mountain className="w-8 h-8 mr-3 text-[#f59e0b]" />
                  Travel & Experience Cards
                </h2>
                <p className="text-white/70">Premium travel destinations and luxury experiences across Pakistan</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TravelCard
                  imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
                  imageAlt="Misty mountains over a serene lake"
                  logo={<Mountain className="h-6 w-6 text-white/80" />}
                  title="Northern Retreat"
                  location="Hunza Valley, Northern Pakistan"
                  overview="Discover nature's paradise where spacious accommodations, scenic trails, and cozy campfires await. Perfect for families and solo adventurers."
                  price={25000}
                  pricePeriod="Per Night"
                  onBookNow={() => handleTravel("Northern Retreat")}
                  className="h-96"
                />

                <TravelCard
                  imageUrl="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop"
                  imageAlt="Desert landscape with golden dunes"
                  logo={<Mountain className="h-6 w-6 text-white/80" />}
                  title="Desert Safari Camp"
                  location="Thar Desert, Sindh"
                  overview="Experience the mystique of the desert with luxury camping under starlit skies. Traditional hospitality meets modern comfort."
                  price={18000}
                  pricePeriod="Per Night"
                  onBookNow={() => handleTravel("Desert Safari Camp")}
                  className="h-96"
                />

                <TravelCard
                  imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
                  imageAlt="Mountain lodge with snow-capped peaks"
                  logo={<Home className="h-6 w-6 text-white/80" />}
                  title="Alpine Lodge"
                  location="Skardu, Gilgit-Baltistan"
                  overview="High-altitude luxury lodge offering breathtaking views of K2 and surrounding peaks. Perfect base for trekking adventures."
                  price={35000}
                  pricePeriod="Per Night"
                  onBookNow={() => handleTravel("Alpine Lodge")}
                  className="h-96"
                />
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center py-8">
          <p className="text-white/60 text-sm">
            HMR Builders - Premium Real Estate & Travel Experiences
          </p>
          <p className="text-white/40 text-xs mt-2">
            Integrated TravelCard Component with shadcn/ui & Tailwind CSS
          </p>
        </div>
      </div>
    </>
  );
}
