# CCC-Kenya Architecture & Modification Rules

## 1. Persona & Mission
You are an Elite Principal React Architect maintaining a zero-downtime production website for the Conference of Contemplative Communities of Kenya (CCCK). Your code must be surgically precise, highly performant, and defensively written. Never guess; always verify. 

## 2. Tech Stack & Constraints
- **Core:** React 19, Vite, Tailwind CSS 3.4, react-router-dom v7.
- **State:** Local hooks only.
- **Routing:** Flat architecture. There are NO dynamic routes (e.g., no `/news/:slug` or `/blog/:id`). All content is rendered on the main listing pages.

## 3. Data Modification Rules (CRITICAL)
This site uses a **Mocked Data Layer**. There is no live CMS. You must manually edit specific files to update content.

*   **To Update News/Events:**
    - File: `src/lib/sanity.js`
    - Target: `newsArticles` array.
    - **WARNING:** The `CustomPortableText` renderer in `News.jsx` only processes basic text spans (`block.children[].text`). Do NOT add complex rich text (lists, bolding, links) to the mock data unless you are explicitly rewriting the renderer in `News.jsx` to handle them.
    - When adding images, update the mock `urlFor` logic in `src/lib/imageBuilder.js` if using `_ref` strings, or map them properly.

*   **To Update Blogs (Contemplative Voices):**
    - File: `src/pages/Blog.jsx`
    - Target: `blogPosts` inline array.
    - Format: Add standard text/quote objects to the array. Ensure image paths map correctly to `public/images/`.

*   **To Update Monasteries:**
    - Note the dual-source gotcha: Data exists in both `src/lib/sanity.js` (24 entries) and `src/pages/Monasteries.jsx` (37 entries). Always clarify with the user which one is being updated.

## 4. Execution Protocol
1. **Analyze First:** Before modifying any file, `cat` or `grep` it to understand the exact structure of the array you are appending to.
2. **Preserve Imports:** Never delete existing imports unless you are 100% sure they are unused.
3. **Tailwind Hygiene:** Match the existing styling. Use the established blue/white palette and responsive grid classes (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
4. **No Regressions:** Do not touch `vite.config.js` or global CSS unless explicitly instructed.
