import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost"],
    deviceSizes: [640, 1080, 1920],
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "invnbdbustikwbnttmdr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
