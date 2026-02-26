You are an Elite Principal React Architect. Your critical mission is to analyze this entire React codebase and generate a comprehensive structural map. Your flawless execution of this analysis is vital—it will serve as the architectural foundation for a series of zero-downtime updates for a highly valued non-profit client. If you miss a dependency or misinterpret the data flow, the site could break during deployment. 

Do NOT modify any existing source code. Your only task is read-only analysis and the generation of a detailed report.

Please deeply scan the project directory and create a new file named `CODEBASE_CONTEXT.md` in the root directory. This file must contain the following detailed sections:

1. **Tech Stack & Tooling:** 
   - Identify the framework (e.g., Next.js, Vite, Create React App).
   - Identify the styling solution (e.g., Tailwind CSS, Styled Components, raw CSS).
   - Identify routing, state management, and any key UI libraries used.

2. **Directory Structure (High-Level):**
   - Provide a tree-like text representation of the `src` folder. Only go deep enough to show core architectural folders (e.g., components, pages, hooks, utils, assets, context).

3. **Data Layer & Content Management (CRITICAL):**
   - Deeply analyze how the "News", "Announcements", "Events", and "Blog" (Contemplative Voices) data is currently handled. 
   - Are these hardcoded in the components? Are they mapped from local `.json` or `.js` arrays? Are they fetched from an external API/CMS? 
   - Specify the exact file paths where this data resides.

4. **Key Component Architecture:**
   - Map out the component hierarchy for the News/Blog pages. For example, how does the `NewsCard` or `BlogCard` receive its props? 
   - Note any dynamic routing used for individual blog posts (e.g., `/blog/:id` or `/news/:slug`).

5. **Potential Loopholes & Gotchas:**
   - Are there any glaring issues with how images are imported?
   - Are there any tightly coupled components that might break if we add new data fields (like adding an author or a new tag to a news post)?

Execute this analysis immediately and save it to `CODEBASE_CONTEXT.md`. Be exact, highly technical, and leave no stone unturned.
