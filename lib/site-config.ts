import {withBasePath} from './paths';
/** Preview remains readable by review tools but excluded from indexing. */
export const isProductionSite=process.env.HNYFILL_ENV==='production';
const configuredOrigin=process.env.NEXT_PUBLIC_SITE_URL;
if(isProductionSite&&!configuredOrigin)throw new Error('Production requires NEXT_PUBLIC_SITE_URL.');
export const siteOrigin=(configuredOrigin||'https://hnyfill-vinnu-utgafa.einarsigei.chatgpt.site').replace(/\/$/,'');
if(!/^https:\/\/[^/]+$/.test(siteOrigin))throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin.');
export const absoluteUrl=(path:string)=>new URL(withBasePath(path),siteOrigin).href;
