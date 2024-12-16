export const runtime = "edge";

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://tarcolor.by/</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://tarcolor.by/catalog</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://tarcolor.by/services</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://tarcolor.by/contacts</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>1.0</priority>
      </url>
    </urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
