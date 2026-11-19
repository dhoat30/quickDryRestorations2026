const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === "production" ? "https://quote.quickdryrestorations.co.nz" : "http://localhost:3000");
    const siteName = "QuickDry Restorations"

// bundle analyzer e
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {
    // Keep verification builds from overwriting the running development server.
    distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",

    async redirects() {
        return [{
            source: '/vinyl-floor-cleaning-polishing-auckland',
            destination: '/vinyl-floor-cleaning-and-polishing-auckland',
            permanent: true,
        }];
    },

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'data.webduel.co.nz',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
        
    ],
    },
    env: {
        url: "https://data.webduel.co.nz",
        siteUrl: baseUrl,
        siteName: siteName,
        EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
        ADDRESS: process.env.ADDRESS,
    },

}

module.exports = withBundleAnalyzer(nextConfig)
