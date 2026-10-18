# Portfolio

An interactive developer portfolio built with Next.js 14, React 18, TypeScript and Tailwind CSS, featuring smooth scrolling, kinetic typography and a command palette.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lenis · Lucide

> A Devflix-themed version of this portfolio is live at [saipavan122001.github.io/Pavan-Portfolio](https://saipavan122001.github.io/Pavan-Portfolio/) ([source](https://github.com/SaiPavan122001/Pavan-Portfolio)).

## Highlights

- **Sections:** hero, experience, education, skills, projects (with featured project and case-study modal), resume and contact
- **Interactive elements:** command palette, terminal and console widgets, animated AI network and architecture visuals
- **Motion design:** preloader, smooth scrolling (Lenis), scroll progress, kinetic text, velocity skew, magnetic buttons and custom cursor (Framer Motion)
- **Content in one place:** profile, experience and projects are driven by a single data file, `src/data/portfolio.ts`

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/SaiPavan122001/Portfolio.git
cd Portfolio
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/          # Next.js App Router pages and layout
├── components/   # UI sections and interactive components
├── data/         # portfolio.ts: all profile content
├── hooks/        # Custom React hooks
└── lib/          # Shared utilities
public/           # Static assets
```

## Customising

Edit `src/data/portfolio.ts` to change the profile, experience, skills and projects. Components read from that file, so no layout changes are needed.

## Author

Adusumalli Sai Pavan: [GitHub](https://github.com/SaiPavan122001) · [LinkedIn](https://www.linkedin.com/in/adusumalli-sai-pavan-111836208/)
