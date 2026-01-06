# My Splash Page

A professional single-page website with live reloading during development.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server with live reloading:
```bash
npm start
```

The site will automatically open in your browser at http://localhost:3000

## Development Workflow

### Live Development

```bash
npm start
# or
npm run dev
```

This starts Vite's dev server with:
- Live reloading for all file changes
- Auto-compilation of markdown, CSS, and JS
- Hot module replacement (HMR)

### Building for Production

```bash
npm run build
```

This creates a single, self-contained `dist/index.html` file ready to deploy.

### Preview Production Build

```bash
npm run preview
```

## Structure

- `index.html` - HTML template with placeholders
- `content/` - Markdown files for each section (auto-reload on change)
  - `hero.md` - Main hero section
  - `section1.md` - First feature
  - `section2.md` - Second feature
  - `section3.md` - Third feature
  - `contact.md` - Contact/newsletter section
- `styles/main.css` - All styles with CSS variables (live reload)
- `src/main.js` - JavaScript functionality (live reload)
- `config.json` - Site configuration
- `vite.config.js` - Vite build configuration

## Customization

### Content

Edit any markdown file in `content/` and see changes instantly in your browser:
- Changes auto-compile and reload
- No manual rebuild needed

### Styling

Edit `styles/main.css`:
- All design variables are in `:root`
- Changes reload instantly
- No build step needed during development

### JavaScript

Edit `src/main.js` for custom functionality:
- Cookie banner logic
- Form handling
- Custom interactions

### Images

Replace placeholder image divs in `index.html` with actual images.

### Analytics

Your site is configured with analytics. To change the provider or ID, edit `config.json`:

```json
{
  "analyticsProvider": "Fathom Analytics",
  "analyticsId": "YOUR_SITE_ID"
}
```

Supported providers:
- None
- Google Analytics
- Fathom Analytics
- Plausible Analytics
- Piwik Pro
- Woopra

Restart the dev server after changing analytics configuration.

### Mailing List

Your site supports multiple email list providers. To change the service or embed code, edit `config.json`:

```json
{
  "mailingList": "beehiv",
  "mailingListEmbed": "<your embed code here>"
}
```

Supported providers:
- None
- Mailchimp
- ConvertKit
- Sender
- beehiv
- Zoho Campaigns

### Calendly Integration

If you added a Calendly link during setup, a "Schedule a Meeting" button appears in the contact section. To update it, edit `config.json`:

```json
{
  "calendlyLink": "https://calendly.com/yourname"
}
```

Remove the link to hide the button.

## Deployment

The production build (`npm run build`) creates a single `dist/index.html` file.

### GitHub Pages

1. Run `npm run build`
2. Commit the `dist/index.html` file
3. Push to GitHub
4. Settings > Pages > Deploy from branch
5. Select your branch and `/dist` folder

### Netlify/Vercel

Option 1 - Upload single file:
- Run `npm run build`
- Upload `dist/index.html`

Option 2 - Connect repo:
- Connect your GitHub repo
- Build command: `npm run build`
- Publish directory: `dist`

### Other Static Hosts

Just upload the `dist/index.html` file - it's completely self-contained with all CSS and JS embedded.
