# TharDraw PWA Demo

A premium Progressive Web App demonstrating a complete lucky draw entry flow with simulated payment processing. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- **Progressive Web App**: Installable, offline-capable, native app experience
- **Complete User Flow**: Onboarding → Form → Ticket Creation → Payment → Dashboard
- **Simulated Payments**: Mock Razorpay integration for demonstration
- **Premium Design**: Mahindra Thar-inspired theme with desert motifs
- **Mobile-First**: Responsive design optimized for mobile devices
- **Accessibility**: WCAG compliant with proper focus management
- **Local Storage**: No backend required, uses localStorage as mock database

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **PWA**: Custom service worker
- **Form**: Typeform embed integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thardrawpwa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy with default settings
3. The app will be available at your Vercel domain

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Ensure your server supports Next.js App Router

## Configuration

### Typeform Integration

For production use, update the Typeform configuration:

1. Replace the form ID in `src/lib/typeform.ts`:
```typescript
const baseUrl = 'https://form.typeform.com/to/YOUR_FORM_ID';
```

2. Set up Typeform redirect URL in your form settings:
```
https://your-domain.com/ticket-created?seed={hidden:ticket_seed}&uid={hidden:user_id}
```

### QR Code Generation

To generate a QR code for the demo:

1. Use any QR code generator
2. Point to your deployed URL
3. Test the complete flow from QR scan to dashboard

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (static)/          # Static pages (terms, privacy)
│   ├── checkout/          # Payment page
│   ├── dashboard/         # User ticket dashboard
│   ├── form/              # Entry form with Typeform
│   ├── ticket-created/    # Ticket confirmation
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Onboarding page
├── components/            # Reusable React components
├── lib/                   # Utility functions and data management
public/
├── images/               # SVG assets (hero, dunes, etc.)
├── icons/                # PWA icons
├── manifest.webmanifest  # PWA manifest
└── sw.js                 # Service worker
```

## Key Components

- **AppShell**: Main layout with header and navigation
- **Hero**: Landing page hero section with SUV silhouette
- **TicketCard**: Displays ticket information and status
- **CheckoutModal**: Simulated payment interface
- **StepBar**: Progress indicator across the flow

## Data Management

The app uses localStorage to simulate a backend:

- **User ID**: Persistent across sessions
- **Tickets**: Stored with status and payment information
- **Payment Status**: Tracks pending/success/failed states

## Theme & Design

- **Color Palette**: 
  - Charcoal (#111111)
  - Sand (#D2B48C) 
  - Off-white (#F7F4EF)
  - Accent Red (#B22222)
  - Olive (#6B775A)

- **Typography**: System fonts with large, bold headings
- **Animations**: Subtle hover effects and transitions
- **Mobile-First**: Optimized for mobile with desktop enhancements

## PWA Features

- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Core pages work without internet
- **App-like Experience**: Standalone display mode
- **Fast Loading**: Service worker caching
- **Push Notifications**: Ready for future implementation

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **PWA Features**: Requires HTTPS in production

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Images**: SVG assets for crisp display at any resolution

## Security

- **No Real Payments**: All payment processing is simulated
- **Local Storage Only**: No sensitive data transmitted
- **HTTPS Required**: For PWA features in production
- **Content Security Policy**: Ready for implementation

## Legal & Compliance

- **Demo Only**: No real contest or payments
- **Privacy Policy**: Covers localStorage usage
- **Terms & Conditions**: Template for actual contest rules
- **Disclaimer**: Clear demo-only messaging throughout

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Environment Variables

No environment variables required for basic functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. See LICENSE file for details.

## Support

For questions or issues:
- Create an issue in the repository
- Contact: hello@thardraw.example

---

**Note**: This is a demonstration application. No real prizes will be awarded and no actual payments are processed.