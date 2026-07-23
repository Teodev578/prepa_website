<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project's Next.js version likely differs from what you learned in training — APIs, conventions, and file structure may have changed, including breaking changes and renamed/removed features.

Before writing or modifying any code touching routing, data fetching, middleware, server/client components, or config files:
1. Check the exact installed version in `package.json` (do not assume "latest").
2. Read the relevant section in `node_modules/next/dist/docs/` for that version. If it's missing or incomplete, say so explicitly rather than falling back on memory.
3. Never use an API, hook, or file convention you haven't confirmed exists in this version's docs or source.
4. If something is marked deprecated or experimental in the docs, do not use it as if it were stable — flag it to the user instead.
<!-- END:nextjs-agent-rules -->