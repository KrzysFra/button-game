import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // the default image optimizer needs a server
  },
  // Only needed if your site lives at https://<user>.github.io/<repo>/
  // basePath: '',
  basePath: '/button-game',
  // assetPrefix: '/client/',

  turbopack: {
    root: path.join(__dirname, "..")
  },
}

// default config
// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     agentFeedback: true,
//   },
//   cacheComponents: true,
//   partialPrefetching: true,
//   turbopack: {
//     root: path.join(__dirname, ".."),
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
// }

export default nextConfig
