const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'weekly', priority: 0.8 },
  { url: '/bcpnp-calculator', changefreq: 'weekly', priority: 0.8 },
  { url: '/auth/panel/dash/bright', changefreq: 'never', priority: 0.0 },
  { url: '/federal-skilled', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.6 },
  { url: '/express-entry', changefreq: 'weekly', priority: 0.8 },
  { url: '/permanent-residency', changefreq: 'monthly', priority: 0.7 },
  { url: '/blogs', changefreq: 'daily', priority: 0.9 },
  { url: '/blogs/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/news', changefreq: 'weekly', priority: 0.8 },
  { url: '/news/:id', changefreq: 'weekly', priority: 0.6 },
  { url: '/category-based', changefreq: 'monthly', priority: 0.6 },
  { url: '/clb-ilets-calculator', changefreq: 'monthly', priority: 0.6 },
  { url: '/previous-draw-history', changefreq: 'weekly', priority: 0.7 },
  { url: '/dash/panel/overwrite', changefreq: 'never', priority: 0.0 },
  { url: '/more-services', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms-&-conditions', changefreq: 'yearly', priority: 0.3 },
  { url: '/skilled-worker-stream', changefreq: 'weekly', priority: 0.8 },
  { url: '/priorities-program', changefreq: 'monthly', priority: 0.7 },
  { url: '/international-post-graduate-program', changefreq: 'monthly', priority: 0.7 },
  { url: '/international-graduate-program', changefreq: 'monthly', priority: 0.7 },
  { url: '/health-authority-stream', changefreq: 'weekly', priority: 0.8 },
  { url: '/healthcare-targeted-draw', changefreq: 'monthly', priority: 0.6 },
  { url: '/entry-level-semi-skilled', changefreq: 'monthly', priority: 0.6 },
  { url: '/bc-pnp', changefreq: 'daily', priority: 1.0 },
  { url: '/pnp', changefreq: 'monthly', priority: 0.7 },
  { url: '/rnip', changefreq: 'monthly', priority: 0.7 },
  { url: '/agri-food-pilot-program', changefreq: 'monthly', priority: 0.7 },
  { url: '/pilot-programs', changefreq: 'monthly', priority: 0.6 },
  { url: '/transport-occupation-targeted-draw', changefreq: 'monthly', priority: 0.7 },
  { url: '/trade-occupation-targeted-draw', changefreq: 'monthly', priority: 0.7 },
  { url: '/stem-targeted-draw', changefreq: 'monthly', priority: 0.7 },
  { url: '/french-targeted-draw', changefreq: 'monthly', priority: 0.7 },
  { url: '/federal-skilled-worker-program', changefreq: 'monthly', priority: 0.8 },
  { url: '/federal-skilled-trades-program', changefreq: 'monthly', priority: 0.7 },
  { url: '/canadian-experience-class', changefreq: 'monthly', priority: 0.8 },
  { url: '/dual-intent-visa', changefreq: 'monthly', priority: 0.7 },
  { url: '/business-visitor-visa', changefreq: 'monthly', priority: 0.6 },
  { url: '/visitor-visa', changefreq: 'monthly', priority: 0.7 },
  { url: '/temporary-resident', changefreq: 'monthly', priority: 0.6 },
  { url: '/temporary-resident-permit-draft', changefreq: 'never', priority: 0.0 },
  { url: '/super-visa', changefreq: 'monthly', priority: 0.6 },
  { url: '/common-law-partner-temporary', changefreq: 'monthly', priority: 0.6 },
  { url: '/common-law-partner-permanent', changefreq: 'monthly', priority: 0.7 },
  { url: '/common-law-partner-international', changefreq: 'monthly', priority: 0.7 },
  { url: '/spouse-common-law-sponsership', changefreq: 'monthly', priority: 0.7 },
  { url: '/restoration-status-draft', changefreq: 'never', priority: 0.0 },
  { url: '/spousal-open-work-permit', changefreq: 'monthly', priority: 0.6 },
  { url: '/open-work-permit-for-spouse-inland', changefreq: 'monthly', priority: 0.6 },
  { url: '/flagpoling', changefreq: 'monthly', priority: 0.7 },
  { url: '/extensions-draft', changefreq: 'never', priority: 0.0 },
  { url: '/study-permit-minors', changefreq: 'monthly', priority: 0.7 },
  { url: '/sds', changefreq: 'monthly', priority: 0.7 },
  { url: '/non-sds', changefreq: 'monthly', priority: 0.7 },
  { url: '/outside-canada', changefreq: 'monthly', priority: 0.7 },
  { url: '/visitor-to-student', changefreq: 'monthly', priority: 0.6 },
  { url: '/change-college-program', changefreq: 'monthly', priority: 0.6 },
  { url: '/inside-canada', changefreq: 'monthly', priority: 0.7 },
  { url: '/student-visa', changefreq: 'monthly', priority: 0.8 },
  { url: '/ParentsGrandparents', changefreq: 'yearly', priority: 0.3 },
  { url: '/orphan', changefreq: 'yearly', priority: 0.3 },
  { url: '/lonely-canadian', changefreq: 'yearly', priority: 0.3 },
  { url: '/humanitarian-compassionate', changefreq: 'monthly', priority: 0.6 },
  { url: '/dependent-children', changefreq: 'monthly', priority: 0.6 },
  { url: '/adoption', changefreq: 'monthly', priority: 0.6 },
  { url: '/family-reunification-sponsorship', changefreq: 'monthly', priority: 0.6 },
  { url: '/pgwp', changefreq: 'monthly', priority: 0.7 },
  { url: '/openWork-dependent-children', changefreq: 'monthly', priority: 0.7 },
  { url: '/open-work-vulnerable-lp', changefreq: 'monthly', priority: 0.7 },
  { url: '/francophone-mobility-program', changefreq: 'monthly', priority: 0.7 },
  { url: '/bridging-open-work-permit-lp', changefreq: 'monthly', priority: 0.7 },
  { url: '/low-wage-lmia', changefreq: 'monthly', priority: 0.7 },
  { url: '/global-stream-lmia', changefreq: 'monthly', priority: 0.7 },
  { url: '/agriculture-stream-lmia', changefreq: 'monthly', priority: 0.7 },
  { url: '/open-work-permit', changefreq: 'monthly', priority: 0.7 },
  { url: '/lmia-reviewed', changefreq: 'monthly', priority: 0.7 },
  { url: '/reply-to-pfl-page', changefreq: 'monthly', priority: 0.7 },
  { url: '/additional-document', changefreq: 'monthly', priority: 0.6 },
  { url: '/reconsideration', changefreq: 'monthly', priority: 0.6 },
  { url: '/citizenship', changefreq: 'yearly', priority: 0.3 },
  { url: '/pr-renewal', changefreq: 'yearly', priority: 0.3 },
  { url: '/work-permit', changefreq: 'monthly', priority: 0.8 },
  { url: '/category-based-express', changefreq: 'monthly', priority: 0.7 },
  { url: '/agriculture-agri-food-occupation', changefreq: 'monthly', priority: 0.7 },
  { url: '/in-home-caregiver-program-lp', changefreq: 'monthly', priority: 0.7 },
  { url: '/pathways-for-caregiver', changefreq: 'monthly', priority: 0.7 },
  { url: '/permanent-residence-pathways-caregivers-lp', changefreq: 'monthly', priority: 0.7 },
  { url: '/booking', changefreq: 'monthly', priority: 0.6 },
  { url: '/spouse-inland', changefreq: 'monthly', priority: 0.7 },
  { url: '/spouse-outland', changefreq: 'monthly', priority: 0.7 },
  { url: '/same-sex', changefreq: 'monthly', priority: 0.7 },
  { url: '/immigration-tools', changefreq: 'monthly', priority: 0.8 },
  { url: '/search', changefreq: 'monthly', priority: 0.7 },
  { url: '/auth/panel/dash/bright', changefreq: 'never', priority: 0.0 },
];

(async () => {
  const sitemapStream = new SitemapStream({ hostname: 'https://brightlightimmigration.ca/' });

  routes.forEach(route => sitemapStream.write(route));
  sitemapStream.end();

  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);

  await streamToPromise(sitemapStream).then(data => writeStream.write(data));

  console.log('Sitemap successfully generated at /public/sitemap.xml');
})();