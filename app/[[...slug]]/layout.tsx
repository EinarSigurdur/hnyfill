import '../globals.css';
import '../editorial.css';
import localFont from 'next/font/local';
const display=localFont({src:'../../public/fonts/barlow-600.ttf',variable:'--font-display',display:'swap'});
const body=localFont({src:[{path:'../../public/fonts/dm-400.ttf',weight:'400'},{path:'../../public/fonts/dm-500.ttf',weight:'500'},{path:'../../public/fonts/dm-600.ttf',weight:'600'}],variable:'--font-body',display:'swap'});
export default async function RootLayout({children,params}:{children:React.ReactNode;params:Promise<{slug?:string[]}>}){const {slug}=await params;return <html data-scroll-behavior="smooth" lang={slug?.[0]==='en'?'en':'is'} className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;}
