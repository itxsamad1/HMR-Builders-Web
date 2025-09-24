'use client';

import { ZoomParallax } from '@/components/zoom-parallax';
import { LampContainer } from '@/components/ui/lamp';

const testImages = [
  {
    src: '/projects/h1-tower/main.jpg',
    alt: 'H1 Tower - Flagship luxury residential tower'
  },
  {
    src: '/projects/saima-tower/main.jpg',
    alt: 'Saima Tower - Premium residential development'
  },
  {
    src: '/projects/aa-waterfront/main.jpg',
    alt: 'AA Waterfront - Luxury waterfront living'
  },
  {
    src: '/projects/hs-residence/main.jpg',
    alt: 'HS Residence - Modern residential complex'
  },
  {
    src: '/projects/saima-marina-residence/main.jpg',
    alt: 'Saima Marina Residence - Coastal luxury living'
  },
  {
    src: '/projects/gold-crest-bay-sands/main.jpg',
    alt: 'Gold Crest Bay Sands - Premium beachfront development'
  },
  {
    src: '/projects/h1-tower/main.jpg',
    alt: 'HMR Builders - Premium real estate development'
  }
];

export default function ZoomPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        <ZoomParallax images={testImages} />
      </div>
      
      {/* Lamp Effect Section */}
      <LampContainer className="bg-black">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            HMR Builders
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Premium Real Estate Investment Platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#315dca] text-white rounded-lg hover:bg-[#203a74] transition-colors">
              Explore Properties
            </button>
            <button className="px-8 py-3 border border-[#315dca] text-[#315dca] rounded-lg hover:bg-[#315dca] hover:text-white transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </LampContainer>
    </div>
  );
}
