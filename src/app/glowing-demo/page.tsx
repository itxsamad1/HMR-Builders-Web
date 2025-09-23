'use client';

import { GlowingEffectDemo } from '@/components/ui/glowing-effect-demo';
import { HMRPropertyCard } from '@/components/ui/hmr-property-card';
import { Building2, TrendingUp, Home } from 'lucide-react';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

export default function GlowingDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1426] to-[#1a2332] relative overflow-hidden p-8">
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
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">
            Glowing Effect Integration
          </h1>
          <p className="text-white/70 text-lg">
            Interactive glowing effects integrated into HMR property cards
          </p>
        </div>

        {/* Glowing Effect Demo Grid */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <div className="w-8 h-8 mr-3 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] rounded-full flex items-center justify-center">
                ✨
              </div>
              Interactive Grid Demo
            </h2>
            <p className="text-white/70">Move your mouse over the cards to see the glowing effect</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <GlowingEffectDemo />
          </div>
        </section>

        {/* HMR Property Cards with Glowing Effect */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <Building2 className="w-8 h-8 mr-3 text-[#14b8a6]" />
              HMR Property Cards
            </h2>
            <p className="text-white/70">Property investment cards enhanced with glowing effects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <HMRPropertyCard
              imageUrl="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
              imageAlt="H1 Tower - Flagship Development"
              logo={<Building2 className="h-6 w-6 text-white/80" />}
              title="H1 Tower"
              location="HMR Waterfront, Karachi"
              overview="The Flagship Tower of HMR Waterfront - a G+39 floors architectural masterpiece offering panoramic Arabian Sea views with world-class amenities."
              price={2500000}
              pricePeriod="Investment"
              status="active"
              roi="18-22%"
              tokens={1000}
              availableTokens={342}
              onInvest={() => console.log('Investing in H1 Tower')}
              className="h-96"
            />
            
            <HMRPropertyCard
              imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              imageAlt="Saima Tower - Ultra-Luxury Development"
              logo={<TrendingUp className="h-6 w-6 text-white/80" />}
              title="Saima Tower"
              location="HMR Waterfront, Karachi"
              overview="Ultra-luxury commercial and residential complex with state-of-the-art facilities and smart building technology."
              price={1750000}
              pricePeriod="Investment"
              status="coming-soon"
              roi="17-21%"
              tokens={1000}
              availableTokens={1000}
              onInvest={() => console.log('Investing in Saima Tower')}
              className="h-96"
            />
            
            <HMRPropertyCard
              imageUrl="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
              imageAlt="AA Waterfront - Smart Luxury Development"
              logo={<Home className="h-6 w-6 text-white/80" />}
              title="AA Waterfront"
              location="HMR Waterfront, Karachi"
              overview="Smart luxury residential development with stunning sea views, smart home technology, and premium amenities."
              price={1750000}
              pricePeriod="Investment"
              status="coming-soon"
              roi="16-20%"
              tokens={1000}
              availableTokens={1000}
              onInvest={() => console.log('Investing in AA Waterfront')}
              className="h-96"
            />
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-gradient-to-r from-[#14b8a6]/10 to-[#0ea5e9]/10 rounded-2xl p-8 border border-[#14b8a6]/30">
          <h3 className="text-2xl font-bold text-white mb-4">How to Use</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-[#14b8a6] mb-2">Interactive Effects</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Move your mouse over the cards</li>
                <li>• Watch the glowing border follow your cursor</li>
                <li>• Experience smooth animations and transitions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#0ea5e9] mb-2">Customization</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Adjust spread, proximity, and border width</li>
                <li>• Modify glow colors and intensity</li>
                <li>• Control animation duration and effects</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
