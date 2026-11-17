/** @type {import('next').NextConfig} */

// 通过 GH_PAGES=1 开启 GitHub Pages 静态导出。
// 普通开发与 Vercel 部署不设置该变量，行为保持不变。
const isGhPages = process.env.GH_PAGES === '1';
// 项目站点部署在 https://<user>.github.io/<repo>/ 子路径下。
// 同时通过 NEXT_PUBLIC_BASE_PATH 暴露给客户端，供 unoptimized 图片的本地路径补齐前缀。
const basePath = isGhPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '/rested-well') : '';

const nextConfig = {
  reactStrictMode: true,
  // 静态站点没有 Next 图片优化服务，改为直连原始图片。
  ...(isGhPages ? { output: 'export', basePath } : {}),
  images: {
    ...(isGhPages ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
