// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'res.cloudinary.com',
//                 pathname: '**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'raw.githubusercontent.com',
//                 pathname: '**',
//             },
//         ],
//     },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          pathname: '**',
        },
      ],
      formats: ['image/avif', 'image/webp'], // Modern image formats
      minimumCacheTTL: 60, // Cache images for 60 seconds
    },
    experimental: {
      optimizePackageImports: ['react-icons'], // If using icon libraries
    },
  };
  export default nextConfig;