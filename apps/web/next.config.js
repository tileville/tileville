const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  transpilePackages: ['supports-color'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oqymtqolwjujkayjyxdt.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zptezhitdheckajmdwip.supabase.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: true,
  output: "standalone",
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: { babel: false },
        },
      ],
    })

    return config
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
}



module.exports = withSentryConfig(nextConfig, {
  org: 'satyam-bansal',
  project: 'tileville',
  authToken: process.env.SENTRY_AUTH_TOKEN || "",
  silent: true,
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  telemetry: false
});
