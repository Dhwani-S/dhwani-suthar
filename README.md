# Portfolio - Senior Data & FinOps Engineer

A modern, minimalist personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Project Structure

```
├── content/
│   ├── blog/           # Blog posts (MDX files)
│   └── projects/       # Project case studies (MDX files)
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── about/      # About page
│   │   ├── blog/       # Blog pages
│   │   ├── projects/   # Projects pages
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/
│   │   ├── layout/     # Navbar, Footer
│   │   ├── providers/  # Theme provider
│   │   └── ui/         # Reusable UI components
│   └── lib/
│       └── utils.ts    # Utility functions
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Content Management

### Adding a New Project

1. Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Your Project Title"
summary: "A brief summary of the project"
date: "2024-01-15"
tags: ["Tag1", "Tag2", "Tag3"]
featured: true
image: "/images/projects/your-image.png"
---

Your project content here...
```

### Adding a New Blog Post

1. Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Blog Post Title"
summary: "A brief summary of the post"
date: "2024-01-15"
tags: ["Tag1", "Tag2"]
author: "Your Name"
---

Your blog content here...
```

## 🎨 Features

- **Responsive Design**: Fully responsive across all devices
- **Dark Mode**: System default + manual toggle (light/dark/system)
- **Animations**: Smooth scroll animations with Framer Motion
- **Bento Grid Layout**: Modern grid layout on the home page
- **SEO Optimized**: Meta tags and Open Graph support
- **Typography**: Beautiful prose styling for MDX content

## 🔧 Customization

### Colors

Edit the CSS variables in `src/app/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Social Links

Update the social links in:
- `src/components/layout/Footer.tsx`
- `src/app/page.tsx` (home page)

## 📦 Extending with MDX

To fully implement MDX content rendering, consider adding:

```bash
npm install @next/mdx @mdx-js/react gray-matter
# or use Contentlayer
npm install contentlayer next-contentlayer
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!
