/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.codeshinetechnology.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  
  // ❌ যেসব path sitemap এ add করতে চাও না
  exclude: [
    '/component/authentication/*',
    '/deshboard/*',
  ],
  
  changefreq: 'weekly',
  priority: 0.7,
};
