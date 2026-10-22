import {siteOrigin} from '@/lib/site-config';
export const dynamic = 'force-static';
import type {MetadataRoute} from 'next';
import {allPaths,url} from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{return allPaths.flatMap(path=>(['is','en'] as const).map(lang=>({url:siteOrigin+url(lang,path),alternates:{languages:{is:siteOrigin+url('is',path),en:siteOrigin+url('en',path)}}})));}
