import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Custom plugin to handle markdown files and inject config
function markdownPlugin() {
  return {
    name: 'markdown-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Read config
        const configPath = path.resolve(process.cwd(), 'config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

        // Read and process all markdown files
        const contentDir = path.resolve(process.cwd(), 'content');
        const sections = {};

        ['hero', 'section1', 'section2', 'section3', 'features-grid', 'contact'].forEach(section => {
          const mdPath = path.join(contentDir, `${section}.md`);
          let fileContent = fs.readFileSync(mdPath, 'utf-8');
          
          // Replace template variables in the markdown content before processing
          fileContent = fileContent.replaceAll('{{companyPurpose}}', config.companyPurpose);
          fileContent = fileContent.replaceAll('{{companyDifferentiator}}', config.companyDifferentiator);
          fileContent = fileContent.replaceAll('{{companyName}}', config.companyName);
          fileContent = fileContent.replaceAll('{{companyLocation}}', config.companyLocation || '');
          
          const { content } = matter(fileContent);
          sections[section] = marked(content);
        });

        // Inject config and sections
        html = html.replaceAll('{{COMPANY_NAME}}', config.companyName);
        html = html.replaceAll('{{COMPANY_PURPOSE}}', config.companyPurpose);
        html = html.replaceAll('{{COMPANY_LOCATION}}', config.companyLocation || '');
        html = html.replaceAll('{{PAGE_TITLE}}', `${config.companyName} - ${config.companyPurpose}`);

        // Replace sections
        html = html.replaceAll('{{HERO_CONTENT}}', sections.hero);
        html = html.replaceAll('{{SECTION1_CONTENT}}', sections.section1);
        html = html.replaceAll('{{SECTION2_CONTENT}}', sections.section2);
        html = html.replaceAll('{{SECTION3_CONTENT}}', sections.section3);
        html = html.replaceAll('{{FEATURES_GRID_CONTENT}}', sections['features-grid']);
        html = html.replaceAll('{{CONTACT_CONTENT}}', sections.contact);

        // Analytics
        let analyticsScript = '';

        if (config.analyticsProvider !== 'None' && config.analyticsId) {
          switch(config.analyticsProvider) {
            case 'Google Analytics':
              analyticsScript = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.analyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.analyticsId}');
    </script>`;
              break;

            case 'Fathom Analytics':
              analyticsScript = `
    <!-- Fathom Analytics -->
    <script src="https://cdn.usefathom.com/script.js" data-site="${config.analyticsId}" defer></script>`;
              break;

            case 'Plausible Analytics':
              analyticsScript = `
    <!-- Plausible Analytics -->
    <script defer data-domain="${config.analyticsId}" src="https://plausible.io/js/script.js"></script>`;
              break;

            case 'Piwik Pro':
              analyticsScript = `
    <!-- Piwik Pro -->
    <script type="text/javascript">
      (function(window, document, dataLayerName, id) {
        window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});
        var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
        function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
        var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");
        stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
        var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");
        var qPString=qP.length>0?("?"+qP.join("&")):"";
        tags.async=!0,tags.src="https://"+id+".containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
        !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
      })(window, document, 'dataLayer', '${config.analyticsId}');
    </script>`;
              break;

            case 'Woopra':
              analyticsScript = `
    <!-- Woopra -->
    <script>
      (function(){
        var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
      })("woopra");
      woopra.config({
        domain: '${config.analyticsId}'
      });
      woopra.track();
    </script>`;
              break;
          }
        }

        html = html.replaceAll('{{ANALYTICS_SCRIPT}}', analyticsScript);

        // Mailing list
        const mailingListSection = config.mailingList !== 'None' && config.mailingListEmbed
          ? config.mailingListEmbed
          : `
    <form class="contact-form">
      <input type="email" placeholder="Enter your email" required>
      <button type="submit">Subscribe</button>
    </form>`;
        html = html.replaceAll('{{MAILING_LIST}}', mailingListSection);

        // Calendly button
        const calendlyButton = config.calendlyLink
          ? `
    <div class="calendly-section">
      <a href="${config.calendlyLink}" target="_blank" rel="noopener noreferrer" class="calendly-button">
        Schedule a Meeting
      </a>
    </div>`
          : '';
        html = html.replaceAll('{{CALENDLY_BUTTON}}', calendlyButton);

        // Cookie banner
        const cookieBanner = config.cookieNotification
          ? `
    <div id="cookie-banner" class="cookie-banner">
      <div class="cookie-content">
        <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <button onclick="acceptCookies()" class="cookie-accept">Accept</button>
      </div>
    </div>`
          : '';
        html = html.replaceAll('{{COOKIE_BANNER}}', cookieBanner);

        // Footer year and location
        html = html.replaceAll('{{YEAR}}', new Date().getFullYear().toString());
        const locationHTML = config.companyLocation ? `<p>${config.companyLocation}</p>` : '';
        html = html.replaceAll('{{FOOTER_LOCATION}}', locationHTML);

        return html;
      }
    }
  };
}

export default defineConfig({
  plugins: [
    markdownPlugin(),
    viteSingleFile()
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100000000, // Inline all assets
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
