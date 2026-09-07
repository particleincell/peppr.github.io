# PEPPR static site

This is a dependency-free static site: upload the contents of this folder to any ordinary Git-based static host (GitHub Pages, Netlify, Cloudflare Pages, etc.). There is no build step. The presentation preserves the source design’s Libre Caslon Text/Hanken Grotesk typography, deep-maroon palette, off-white surfaces, border treatment, and faint seal motif.

## Edit content

The project and publication catalog is intentionally centralized in `assets/data/content.js`. This is the one exception to the page-by-page HTML rule: it prevents the same title, status, tags, and summary from being copied into the home page and listing pages.

- Edit project titles, statuses, tags, summaries, featured status, links, and per-project thumbnail paths in `assets/data/content.js`.
- Edit project detail content in `projects/<project-id>/index.html`.
- Edit the team and Direct Inquiries content in `team.html`.
- Edit publication titles, tags, summaries, and featured status in `assets/data/content.js`; edit full publication records in `publications/<publication-id>.html`.
- JavaScript is reserved for interface behavior: the mobile menu, project filters/sorting, and the email-form handoff.

The shared layout and interactions are in `assets/js/site.js`; the source-design tokens and responsive styling are in `assets/css/site.css`. The supplied local PEPPR seal image provides the varied faint background treatment.

Each project has its own folder and `index.html`, matching the supplied example structure. To add a project, copy `projects/project-template/`, rename that folder to the project ID, then edit its visible HTML. Links are deliberately predictable: `projects/your-id/`.

Each project page has an editable Technical Specifications section and an image carousel at the bottom. Copy one `.spec` row to add a data point, and copy one `.carousel-slide` figure inside that project's carousel to add an image. No JavaScript changes are needed for either.

## Important launch items

- Replace the illustrative PEPPR names, email addresses, research copy, and legal-policy placeholders with approved institutional material.
- Add approved PDFs or publication pages and update each publication's `href` in `assets/data/content.js` when it is cleared for public distribution.
- Replace the three illustrative team portraits and photo placeholders with approved local images. The page deliberately keeps an image slot for every team member.
- Review `FORMS.md` to choose email-client submission (included) or a hosted form endpoint.
- Test the site from a local web server (not directly from `file://`) before publishing: `python3 -m http.server 8000` and visit `http://localhost:8000`.
