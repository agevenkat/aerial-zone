import { html, raw, z, type Layout } from "vagejs";

// Business contact details shown in the footer (from the Aerial Zone brochure).
const PHONE_DISPLAY = "+91 89047 28080";
const PHONE_HREF = "tel:+918904728080";
const EMAIL = "aerialzone.gymnastics@gmail.com";
// Google Maps embed for pages with `map: true` (the Contact page).
const MAP_SRC =
  "https://maps.google.com/maps?q=Aerial%20Zone%2C%20Kembathalli%20Main%20Road%2C%20Gottigere%2C%20Bengaluru%20560083&t=m&z=15&output=embed&iwloc=near";

// Page frontmatter this layout understands, besides the standard keys.
export const frontmatter = z.object({ map: z.boolean().optional() });

// `html` escapes every ${value}; `raw(content)` inserts the page's already-sanitized HTML.
const layout: Layout = ({ content, page, site, menus }) => {
  const title = site.title && site.title !== page.title ? `${page.title} | ${site.title}` : page.title;
  const fm = page.frontmatter;
  const isHome = page.route === "/";
  // The trail vagejs describes in BreadcrumbList JSON-LD (seo.structuredData.breadcrumbs).
  const trail = page.breadcrumbs;
  // Articles show who wrote them and when: the same facts as their Article JSON-LD.
  const byline =
    fm.type === "article" && (fm.datePublished || fm.author)
      ? html`<p class="byline">${fm.author ? html`By ${fm.author}` : ""}${fm.author && fm.datePublished ? " · " : ""}${fm.datePublished ? html`<time datetime="${fm.datePublished}">${fm.datePublished.slice(0, 10)}</time>` : ""}</p>`
      : "";
  const body = fm.type === "article" ? html`<article class="prose">
${raw(content)}
${byline}
</article>` : raw(content);
  const navLinks = (menus.main ?? []).map(
    (item) => html`<li><a href="${item.href}"${item.current ? raw(' aria-current="page"') : ""}>${item.label}</a></li>`,
  );
  return html`<!doctype html>
<html lang="${page.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#2a0a5c" />
    <title>${title}</title>
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preload" href="/fonts/bricolage-grotesque.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/css/site.css" />
  </head>
  <body class="${isHome ? "is-home" : "is-inner"}">
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="bar">
        <a class="brand" href="/" aria-label="Aerial Zone home"><img src="/images/logo.svg" alt="Aerial Zone, gymnastics for kids" width="170" height="98" /></a>
        <nav class="nav-desktop" aria-label="Main"><ul>${navLinks}</ul></nav>
        <a class="btn primary nav-cta" href="/contact/">Join now</a>
        <details class="nav-mobile">
          <summary aria-label="Open menu"><span></span><span></span><span></span></summary>
          <nav aria-label="Main (mobile)"><ul>${navLinks}</ul>
            <a class="btn primary" href="/contact/">Join now</a>
          </nav>
        </details>
      </div>
    </header>
    <main id="main">
${!isHome && trail.length > 1 ? html`<nav class="breadcrumbs" aria-label="Breadcrumb" data-vage-copy="skip"><ol>${trail.map((p, i) => html`<li>${i === trail.length - 1 ? html`<span aria-current="page">${p.label}</span>` : html`<a href="${p.route}">${p.label}</a>`}</li>`)}</ol></nav>
` : ""}${body}
${fm.map ? html`<section class="map-band" aria-labelledby="find-us">
  <div class="section-head"><span class="eyebrow">Find us</span><h2 id="find-us">Visit the gym</h2><p class="lead">Kembathalli Main Road, Gottigere, Bengaluru 560083</p></div>
  <div class="map-frame"><iframe src="${MAP_SRC}" title="Map showing Aerial Zone on Kembathalli Main Road, Gottigere, Bengaluru" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</section>` : ""}
    </main>
    <footer class="site-footer">
      <div class="foot-grid">
        <div class="foot-brand">
          <a class="foot-logo" href="/"><img src="/images/logo.svg" alt="Aerial Zone" width="150" height="87" loading="lazy" /></a>
          <p class="foot-tag">Creating champions for life.</p>
        </div>
        ${(menus.footer ?? []).map(
          (col) => html`<div class="foot-col"><h2>${col.label}</h2><ul>${(col.items ?? []).map((item) => html`<li><a href="${item.href}">${item.label}</a></li>`)}</ul></div>`,
        )}
        <div class="foot-col">
          <h2>Visit us</h2>
          <address>
            Kembathalli Main Road<br />Gottigere, Bengaluru 560083<br />
            <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a><br />
            <a href="mailto:${EMAIL}">${EMAIL}</a>
          </address>
        </div>
      </div>
      <p class="foot-legal">© ${new Date().getFullYear()} ${site.title ?? ""}. All rights reserved.</p>
    </footer>
  </body>
</html>
`;
};

// vagejs adds description, canonical, Open Graph and JSON-LD tags before </head>
// unless this layout already writes them.
export default layout;
