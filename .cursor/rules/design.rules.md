# Design Rules

- Always use **React with functional components** and **hooks** (no class components).
- Ensure **consistent theming**:  
  - Dark background (`#0f172a`) with light text (`#f1f5f9`).  
  - Accent color: `#38bdf8`.  
  - Rounded corners: `2xl`.  
  - Soft shadows for cards and buttons.
- Apply **TailwindCSS utility classes** for styling. Avoid inline styles unless dynamic logic is required.
- Layouts should be **grid-based** to maintain spacing and responsiveness.
- Animate user interactions with **Framer Motion** (fade-in, scale, subtle transitions).
- Ensure **mobile-first design** with responsive breakpoints (`sm`, `md`, `lg`, `xl`).
- Use **semantic HTML** elements wrapped in styled React components for accessibility.
- Navigation and page flow should be **predictable and minimalistic** (avoid clutter).
