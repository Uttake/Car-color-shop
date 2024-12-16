export const runtime = "edge"; 

export async function GET() {
  const robots = `
    User-agent: *
    Disallow: /adminpage/
    Disallow: /api/
    Allow: /

    Sitemap: https://tarcolor.by/sitemap.xml
  `;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}