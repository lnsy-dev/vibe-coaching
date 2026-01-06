# AGENTS.md - Content & Style Management Guide

This guide explains how to work with the Pochade Home Page generator's content system and styling framework for AI agents and developers.

## Content Management System

### Understanding the Content Structure

The project uses a markdown-based content system with YAML frontmatter that contains LLM prompts. Each content file in the `content/` directory has:

1. **YAML frontmatter** with a `prompt` field containing instructions for LLM content generation
2. **Markdown content** that gets compiled into the final HTML

### Content Files Overview

| File | Purpose | HTML Placeholder |
|------|---------|------------------|
| `content/hero.md` | Hero section with main headline | `{{HERO_CONTENT}}` |
| `content/section1.md` | First feature section | `{{SECTION1_CONTENT}}` |
| `content/section2.md` | Second feature section | `{{SECTION2_CONTENT}}` |
| `content/section3.md` | Third feature section | `{{SECTION3_CONTENT}}` |
| `content/features-grid.md` | Grid of feature boxes | `{{FEATURES_GRID_CONTENT}}` |
| `content/contact.md` | Contact/newsletter section | `{{CONTACT_CONTENT}}` |

### How to Update Content with LLM Prompts

Each markdown file contains a prompt template in the YAML frontmatter. Here's the workflow:

#### 1. Extract the Prompt
Read the `prompt` field from the YAML frontmatter:

```yaml
---
prompt: Please write a punchy, compelling hero section text for a splash page for a company that {{companyPurpose}}. The text should be bold, attention-grabbing, and clearly communicate the company's value proposition. Keep it concise - 1-2 sentences maximum.
---
```

#### 2. Replace Placeholders
Replace template variables like `{{companyPurpose}}` with actual values:
- `{{companyPurpose}}` → "builds AI-powered marketing tools"
- `{{companyName}}` → "TechCorp"

#### 3. Generate Content
Use your preferred LLM with the customized prompt to generate new content.

#### 4. Update the Markdown
Replace the existing markdown content (below the `---` frontmatter) with the generated content.

#### 5. Live Preview
If the dev server is running (`npm start`), changes will appear instantly in the browser.

### Example Content Update Process

**Original file (`content/hero.md`):**
```markdown
---
prompt: Please write a punchy, compelling hero section text for a splash page for a company that {{companyPurpose}}. The text should be bold, attention-grabbing, and clearly communicate the company's value proposition. Keep it concise - 1-2 sentences maximum.
---

# Put your main headline here

Write your compelling value proposition here - 1-2 sentences that clearly explain what your company does and why customers should care.
```

**After LLM generation:**
```markdown
---
prompt: Please write a punchy, compelling hero section text for a splash page for a company that {{companyPurpose}}. The text should be bold, attention-grabbing, and clearly communicate the company's value proposition. Keep it concise - 1-2 sentences maximum.
---

# Transform Your Marketing with AI-Powered Precision

We build intelligent marketing tools that turn data into revenue, helping businesses increase conversions by 300% through automated, personalized campaigns.
```

## Styling System

### CSS Variables Architecture

The entire design system is built on CSS custom properties (variables) defined in `:root`. This makes global style changes simple and consistent.

#### Color System
```css
:root {
  --primary-color: #0f62fe;        /* Main brand color */
  --secondary-color: #161616;      /* Dark backgrounds */
  --text-primary: #161616;         /* Main text color */
  --text-secondary: #525252;       /* Secondary text */
  --background-primary: #ffffff;   /* Main background */
  --background-secondary: #f4f4f4; /* Alternate sections */
  --border-color: #e0e0e0;         /* Borders and dividers */
  --accent-color: #0f62fe;         /* Accent elements */
}
```

#### Typography System
```css
:root {
  --font-family-sans: 'IBM Plex Sans', ...;
  --font-family-mono: 'IBM Plex Mono', ...;
  
  --font-size-hero: 3rem;
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.5rem;
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
}
```

#### Spacing System
```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 2rem;     /* 32px */
  --spacing-lg: 4rem;     /* 64px */
  --spacing-xl: 6rem;     /* 96px */
}
```

### How to Customize Styles

#### Quick Brand Changes
To rebrand the site, update these key variables:

```css
:root {
  --primary-color: #your-brand-color;
  --secondary-color: #your-dark-color;
  --font-family-sans: 'Your-Font', sans-serif;
}
```

#### Section-Specific Styling
Each section has dedicated CSS classes:

- `.hero` - Hero section with background image
- `.feature-section` - Feature sections (alternating backgrounds)
- `.features-grid` - Grid of feature boxes
- `.contact` - Contact/newsletter section
- `.footer` - Footer section

#### Responsive Design
The system uses mobile-first responsive design with breakpoints:

```css
/* Mobile: Default styles */

/* Tablet: 768px+ */
@media (min-width: 768px) { ... }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { ... }
```

### Common Style Modifications

#### Change Primary Color
```css
:root {
  --primary-color: #ff6b35; /* New orange brand color */
}
```

#### Adjust Typography Scale
```css
:root {
  --font-size-hero: 4.5rem;  /* Larger hero text */
  --font-size-h2: 2.25rem;   /* Slightly larger headings */
}
```

#### Modify Spacing
```css
:root {
  --spacing-lg: 5rem;  /* More space between sections */
  --spacing-xl: 8rem;  /* Even more space */
}
```

#### Custom Section Background
```css
.feature-section.custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

## Development Workflow

### Live Development
```bash
npm start
```
- Auto-reloads on content changes
- Live CSS updates
- Hot module replacement

### Content Generation Workflow
1. Read existing content files to understand structure
2. Extract prompts from YAML frontmatter
3. Customize prompts with specific company/product details
4. Generate content using LLM
5. Update markdown files
6. Preview changes in browser
7. Iterate as needed

### Style Customization Workflow
1. Identify the element/section to modify
2. Locate relevant CSS variables in `:root`
3. Update variables for global changes
4. Add custom CSS for specific modifications
5. Test across breakpoints (mobile, tablet, desktop)
6. Verify accessibility and contrast

### Production Build
```bash
npm run build
```
Creates a single `dist/index.html` file with all assets embedded.

## Best Practices

### Content
- Keep hero text concise (1-2 sentences)
- Use active voice and clear value propositions
- Maintain consistent tone across sections
- Test readability on mobile devices

### Styling
- Use CSS variables for consistency
- Test color contrast for accessibility
- Maintain responsive design principles
- Keep custom CSS minimal and organized

### Performance
- Optimize images before adding to `/assets/images/`
- Use appropriate image formats (WebP when possible)
- Test loading speed after content changes
- Minimize custom CSS additions

## File Structure Reference

```
project/
├── content/              # Markdown files with YAML frontmatter
│   ├── hero.md          # Hero section content
│   ├── section1.md      # Feature section 1
│   ├── section2.md      # Feature section 2
│   ├── section3.md      # Feature section 3
│   ├── features-grid.md # Grid features
│   └── contact.md       # Contact section
├── styles/
│   └── main.css         # All styles with CSS variables
├── assets/
│   └── images/          # Image assets
├── src/
│   └── main.js          # JavaScript functionality
└── index.html           # HTML template with placeholders
```

This system enables rapid content generation and style customization while maintaining professional design standards and responsive behavior across all devices.