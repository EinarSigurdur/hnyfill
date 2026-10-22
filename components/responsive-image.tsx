import {basePath,withBasePath} from '@/lib/paths';
import manifest from '@/lib/image-manifest.json';
type Props={src:string;alt:string;sizes?:string;priority?:boolean;className?:string};
/** Local srcsets keep the static preview fast without a hosted image optimizer. */
export function ResponsiveImage({src,alt,sizes='(max-width: 700px) 100vw, 60vw',priority=false,className}:Props){
 const image=manifest[(basePath&&src.startsWith(basePath+'/')?src.slice(basePath.length):src) as keyof typeof manifest];
 return <img src={withBasePath(src)} srcSet={image?.variants.map(v=>`${withBasePath(v.src)} ${v.width}w`).join(', ')} sizes={sizes} width={image?.width||600} height={image?.height||700} alt={alt} className={className} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async"/>;
}
