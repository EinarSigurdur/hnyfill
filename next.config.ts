import type {NextConfig} from 'next';
const config:NextConfig={output:"export",basePath:process.env.NEXT_PUBLIC_BASE_PATH||'',trailingSlash:true,devIndicators:false,images:{unoptimized:true,formats:['image/avif','image/webp']}};
export default config;
