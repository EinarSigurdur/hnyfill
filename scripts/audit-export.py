"""Check every exported page, internal anchor and SEO image without a crawler service."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
root=Path('out');origin='https://einarsigurdur.github.io/hnyfill';errors=[];links=0;pages=0
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.links=[];self.meta={};self.h1=0;self.lang=None
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.add(d['id'])
  if tag=='html':self.lang=d.get('lang')
  if tag=='h1':self.h1+=1
  if tag=='a':self.links.append(d.get('href',''))
  if tag=='meta':self.meta[d.get('property',d.get('name',''))]=d.get('content','')
  if tag=='link' and d.get('rel')=='canonical':self.meta['canonical']=d.get('href','')
parsed={}
for f in root.rglob('*.html'):
 p=Page();p.feed(f.read_text());parsed[f]=p
for f,p in parsed.items():
 if f.name=='404.html' or '404' in f.parts or '_not-found' in f.parts:continue
 pages+=1
 if p.h1!=1:errors.append(f'{f}: {p.h1} h1 elements')
 if p.lang not in ['is','en']:errors.append(f'{f}: missing language')
 if 'noindex' not in p.meta.get('robots',''):errors.append(f'{f}: preview indexable')
 for k in ['canonical','og:url','og:image','twitter:image']:
  if not p.meta.get(k,'').startswith(origin+'/'):errors.append(f'{f}: invalid {k}')
 image=p.meta.get('og:image','');asset=root/urlsplit(image).path.removeprefix('/hnyfill/').lstrip('/')
 if not asset.is_file():errors.append(f'{f}: missing OG image')
 for link in p.links:
  if not link.startswith(('/', '#')) or link.startswith('//'):continue
  links+=1;u=urlsplit(link);path=unquote(u.path)
  target=f if not path else root/path.removeprefix('/hnyfill').lstrip('/')
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'{f}: missing {link}');continue
  if u.fragment and target in parsed and u.fragment not in parsed[target].ids:errors.append(f'{f}: missing anchor {link}')
result={'pages':pages,'internal_links':links,'errors':errors};print(json.dumps(result,indent=2));Path('review/export-audit.json').write_text(json.dumps(result,indent=2));raise SystemExit(bool(errors))
