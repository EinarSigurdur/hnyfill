/** Optional subdirectory hosting; empty for Sites and custom domains. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function withBasePath(path:string){
 if(!path.startsWith('/') || path.startsWith('//') || (basePath && (path===basePath || path.startsWith(basePath+'/'))))return path;
 return basePath+path;
}
