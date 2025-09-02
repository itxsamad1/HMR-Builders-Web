# HMR Builders - Next.js Website

A modern, responsive website for HMR Builders, Pakistan's premier real estate investment platform. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🏗️ **Modern Design**: Clean, professional design inspired by PRYPCO Mint
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- 🚀 **Next.js 14**: Built with the latest Next.js features and App Router
- 🎨 **Tailwind CSS**: Modern utility-first CSS framework
- ⚡ **Performance**: Optimized for speed and SEO
- 🔒 **SECP Compliant**: Regulatory compliance messaging for Pakistani market

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/            # Reusable components
└── lib/                  # Utility functions
```

## Key Sections

- **Hero Section**: Compelling introduction with Pakistan focus
- **Features**: Why choose HMR Builders
- **Properties**: Investment opportunities with Pakistani real estate
- **How It Works**: Simple 3-step process
- **Statistics**: Platform metrics and achievements
- **Regulatory**: SECP compliance information
- **CTA**: Call-to-action for investors
- **Newsletter**: Email subscription
- **Footer**: Complete site navigation

## Customization

### Colors
The website uses a blue and yellow color scheme that can be customized in `tailwind.config.ts`

### Content
All content is easily editable in `src/app/page.tsx`:
- Property listings
- Company information
- Statistics and metrics
- Contact details

### Images
Replace placeholder images with actual property photos and company assets

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary to HMR Builders.

## Support

For technical support or questions about the website, please contact the development team.

---

**HMR Builders** - Building Pakistan's Future, One Investment at a Time 🇵🇰
