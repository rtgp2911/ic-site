/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: process.env.STATIC_EXPORT === "1",
  images: {
    unoptimized: process.env.STATIC_EXPORT === "1",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com"
      }
    ]
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.next/**", "**/.npm-cache/**"]
      };
    }

    return config;
  }
};

export default nextConfig;
