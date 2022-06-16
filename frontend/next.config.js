/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['192.168.1.5'], // todo - edit this together with package.json proxy
    },

    experimental: {
        outputStandalone: true,
    },

    resolve: {
        fallback: {
            'react/jsx-runtime': 'react/jsx-runtime.js',
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
        },
    },
}

module.exports = nextConfig
