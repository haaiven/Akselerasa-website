# PT IJA Landing Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Boga Group (boga.id) for layout structure and visual feeling - large hero sections, bold typography, clear content sections, strong imagery placement. Maintain unique PT IJA brand identity while borrowing the clean, premium, full-width sectional approach.

## Visual Style
- **Aesthetic**: Clean, minimalist, premium tech-meets-street-food aesthetic
- **Color Palette**: Warm palette with yellows, browns, and neutrals - cozy street food feeling with professional tech credibility
- **White Space**: Generous, full-width sections with breathing room between content
- **Brand Personality**: Warm, friendly, approachable yet professional and modern

## Typography
- **Headings**: Large, bold typography for maximum impact
- **Body Text**: Smaller, clean, highly readable font
- **Hierarchy**: Strong contrast between heading sizes and body text to create clear visual flow

## Layout System
- **Spacing Units**: Use Tailwind spacing of 4, 8, 12, 16, 20, and 32 (p-4, py-8, gap-12, etc.)
- **Container**: Full-width sections with max-w-7xl inner containers for content
- **Responsive**: Mobile-first approach, stacking columns on mobile, multi-column on desktop

## Component Library

### Navigation (Sticky Header)
- Logo on left (PT IJA logo from provided image)
- Menu items on right: Home, About, Our Menu, Locations, Order, Contact
- Smooth scroll behavior to sections
- Clean, minimal navigation bar

### Hero Section
- Full-width background image (street food scene)
- Large headline: "Leading the Future of Street Food with smart systems"
- Sub-headline: "Your Journey From Customer to Owner Starts Here"
- Dual CTAs: Primary "Join Now" + Secondary "View Our Menu"
- Scroll indicator at bottom (text or icon)
- Buttons with blurred backgrounds when on images

### Content Sections
- **About**: Two-column layout (text left, image right on desktop)
- **Services Grid**: 6 cards with icons and descriptions, 3 columns on desktop, 2 on tablet, 1 on mobile
- **Mission Grid**: 5 value cards in grid layout with subtle hover effects
- **Market Focus**: 6 icon-text columns showcasing advantages
- **Locations**: Cards with addresses, hours, map placeholder
- **Order**: Prominent WhatsApp CTA with ordering instructions
- **Contact**: Contact form (Name, Email, Message) + newsletter signup + social links

### Footer
- Copyright, address, navigation links
- Floating WhatsApp chat button (styled uniquely but inspired by Boga)

## Images
- **Hero Image**: Large, full-width street food scene as background
- **About Section**: Image showing technology in street food context
- **Service Cards**: Icons for each service (Transaction Tracking, Dashboard, SOP, Franchise, Analytics, Brand Support)
- **Mission Cards**: Icons or subtle visuals for each mission point
- **Market Focus**: Simple icons for each competitive advantage
- All images use placeholders that can be replaced later

## Interactions
- Smooth scroll navigation
- Subtle hover effects on cards and buttons (minimal animations)
- No distracting animations - keep focus on content
- Responsive touch-friendly interactions for mobile

## Technical Notes
- Single-page layout with section anchors
- Semantic HTML (header, nav, main, section, footer)
- Mobile-first responsive breakpoints
- Deploy-ready for Cloudflare Pages (index.html + assets)