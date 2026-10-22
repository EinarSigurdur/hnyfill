import {execFileSync} from 'node:child_process';
import {cpSync,rmSync,writeFileSync} from 'node:fs';
execFileSync(process.execPath,['node_modules/next/dist/bin/next','build','--webpack'],{stdio:'inherit',env:{...process.env,HNYFILL_ENV:'preview',NEXT_PUBLIC_BASE_PATH:'/hnyfill',NEXT_PUBLIC_SITE_URL:'https://einarsigurdur.github.io'}});
rmSync('docs',{recursive:true,force:true});
cpSync('out','docs',{recursive:true});
writeFileSync('docs/.nojekyll','');
