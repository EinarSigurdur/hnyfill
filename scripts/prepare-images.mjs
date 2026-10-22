import {createRequire} from 'node:module';
import {readdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const sharp=require(require.resolve('sharp',{paths:[require.resolve('next/package.json')]}));
const images={};
for(const name of await readdir('public/media')){
 if(!name.endsWith('~mv2.webp'))continue;
 const src='/media/'+name;const m=await sharp('public'+src).metadata();const variants=[];
 for(const width of [480,800,1200]){if(width>=m.width)continue;const path=src.replace('.webp',`-${width}.webp`);await sharp('public'+src).resize(width).webp({quality:82}).toFile('public'+path);variants.push({src:path,width});}
 variants.push({src,width:m.width});images[src]={width:m.width,height:m.height,variants};
}
await writeFile('lib/image-manifest.json',JSON.stringify(images));
console.log(`Prepared responsive versions of ${Object.keys(images).length} real photographs.`);
