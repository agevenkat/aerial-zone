import { defineConfig } from "vagejs";

export default defineConfig({
  // Your production origin. Needed for canonical URLs and sitemap.xml.
  site: "https://www.aerialzone.in",
  title: "Aerial Zone",
  description:
    "Aerial Zone is a gymnastics school in Gottigere, Bengaluru, offering training for children, teens and adults, from first rolls to competition.",
  lang: "en-IN",

  // Menus for layouts (props.menus). Edit them here, not in the layout.
  // { page: "/about/" } uses that page's navTitle or title; other sites: { label: "GitHub", href: "https://..." }.
  menus: {
    main: [
      { page: "/" },
      { page: "/about/" },
      { page: "/services/" },
      { page: "/achievements/" },
      { page: "/schools/" },
      { page: "/faq/" },
      { page: "/contact/" },
    ],
    footer: [
      {
        label: "Explore",
        items: [{ page: "/about/" }, { page: "/services/" }, { page: "/achievements/" }],
      },
      {
        label: "Get started",
        items: [{ page: "/schools/" }, { page: "/faq/" }, { page: "/contact/" }],
      },
    ],
  },

  seo: {
    robots: {
      // AI crawler policy is your decision; unset means the "*" rules apply.
      // aiTraining: "disallow", // GPTBot, ClaudeBot, Google-Extended, Applebot-Extended
      // aiSearch: "allow",      // OAI-SearchBot, Claude-SearchBot, PerplexityBot
    },
    sitemap: true,
    // llms.txt plus llms-full.txt, and a Markdown copy of each page (/about/ -> /about.md), for AI tools.
    llmsTxt: { full: true },
    markdownCopies: true,
    // Once the project is in git: sitemap <lastmod> dates from each page's last commit.
    // lastmod: "git",
    // Social preview image for pages without their own `image:` (1200x630 PNG or JPG in public/).
    defaultImage: "/images/og.jpg",
    structuredData: {
      // BreadcrumbList for the trail src/layouts/default.ts shows.
      breadcrumbs: true,
      // Who runs the site (home page JSON-LD, and the publisher of articles). Only true facts.
      organization: { name: "Aerial Zone", url: "https://www.aerialzone.in", logo: "/images/logo.svg" },
    },
  },

  // Spam protection: links to other websites must be approved in links.lock.json
  // (npx vage links approve <domain>). "require" also fails if that file is deleted.
  security: { outboundLinks: "require" },

  // redirects: { "/old-page/": "/about/" },

  // Analytics is off until you configure it. Tags are added to production builds only.
  // integrations: {
  //   ga4: {
  //     measurementId: process.env.GA4_MEASUREMENT_ID, // e.g. "G-XXXXXXX"
  //     consentDefault: "denied", // your consent UI calls window.vageConsent.update({ analytics_storage: "granted" })
  //     events: { signup_click: { params: ["plan"] } },
  //   },
  //   searchConsole: { property: "sc-domain:example.com" },
  // },
});
