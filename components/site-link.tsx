import NextLink from 'next/link';
import type {ComponentProps} from 'react';
import {basePath} from '@/lib/paths';
/** Next adds basePath itself; native anchors use the fully qualified local path. */
export default function SiteLink({href,...props}:ComponentProps<typeof NextLink>){
 const local=typeof href==='string'&&basePath&&(href===basePath||href.startsWith(basePath+'/'))?href.slice(basePath.length)||'/':href;
 return <NextLink href={local} {...props}/>;
}
