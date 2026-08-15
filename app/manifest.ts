import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    short_name: process.env.NEXT_PUBLIC_APP_NAME,
    description: 'Portfolio de Killian GAYEZ, développeur web front-end.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1120',
    theme_color: '#0B1120',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}