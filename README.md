# Interactive Developer Portfolio Terminal

A modern developer portfolio with an interactive terminal interface built with Next.js and Cosmic CMS. Features a unique terminal experience where visitors can explore professional information using classic Unix commands.

![App Preview](https://imgix.cosmicjs.com/cadd6270-8c1a-11f0-ae7a-c321a9bf1869-photo-1507003211169-0a1dd7228f2d-1757270698066.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## Features

- 🖥️ **Interactive Terminal Interface** - Real terminal experience with command history and tab completion
- 👨‍💻 **Dynamic Profile Display** - Showcases developer information, skills, and experience
- 💼 **Project Portfolio** - Visual project cards with tech stacks and links
- 📈 **Skills Organization** - Skills grouped by category with proficiency levels
- 📞 **Contact Integration** - Multiple contact methods with availability status
- 📱 **Responsive Design** - Works seamlessly across all devices
- ⚡ **Fast Performance** - Optimized with Next.js 15 and server components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bdd17d285c02bfe718df88&clone_repository=68bdd64d285c02bfe718dfa9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "create a terminal in website to put my portpoio details wen entering key word , in the terminal details must appear, do it fot the developer portfolio"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Framer Motion** - Smooth animations
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Developer Profile
```typescript
import { cosmic } from '@/lib/cosmic'

const profile = await cosmic.objects.findOne({
  type: 'developer-profile'
}).depth(1)
```

### Getting Skills by Category
```typescript
const skills = await cosmic.objects.find({
  type: 'skills'
}).depth(1)

// Group by category
const skillsByCategory = skills.objects.reduce((acc, skill) => {
  const category = skill.metadata?.category?.key || 'other'
  if (!acc[category]) acc[category] = []
  acc[category].push(skill)
  return acc
}, {})
```

### Fetching Projects
```typescript
const projects = await cosmic.objects.find({
  type: 'projects'
}).depth(1)
```

## Cosmic CMS Integration

This application integrates with the following Cosmic object types:

- **Developer Profile** - Personal information and bio
- **Skills** - Technical skills organized by category
- **Experience** - Work history and achievements  
- **Projects** - Portfolio projects with images and links
- **Contact Info** - Contact details and social links

The terminal interface provides interactive commands to explore all this content:
- `ls` - List available commands
- `cat profile` - View developer profile
- `cat skills` - Display skills by category
- `cat experience` - Show work experience
- `cat projects` - List portfolio projects
- `cat contact` - Display contact information

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy with automatic builds on push

### Netlify
1. Connect your repository to Netlify
2. Set environment variables in site settings
3. Deploy with continuous deployment

Make sure to set your `COSMIC_BUCKET_SLUG` and `COSMIC_READ_KEY` environment variables in your deployment platform.

<!-- README_END -->