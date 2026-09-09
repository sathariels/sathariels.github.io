#!/usr/bin/env python3
"""Validate the static portfolio and stage only public files in dist/. No packages required."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import shutil
import tempfile
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / 'index.html', ROOT / '404.html', *sorted((ROOT / 'projects').glob('*/index.html'))]
PUBLIC = ['index.html', '404.html', 'assets', 'projects', 'resume.pdf', 'robots.txt', 'sitemap.xml']
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.refs, self.metadata, self.stack = path, set(), [], {}, []
        self.h1 = self.main = self.titles = 0
        self.lang = False
        self.errors = []
        self.feed(path.read_text())
        if self.stack:
            self.errors.append(f'unclosed tags: {self.stack}')

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang') == 'en'
        if tag == 'h1': self.h1 += 1
        if tag == 'main': self.main += 1
        if tag == 'title': self.titles += 1
        if a.get('id'):
            if a['id'] in self.ids: self.errors.append(f'duplicate id: {a["id"]}')
            self.ids.add(a['id'])
        for field in ['href', 'src']:
            if a.get(field): self.refs.append(a[field])
        if tag == 'meta': self.metadata[a.get('name', a.get('property'))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.metadata['canonical'] = a.get('href', '')
        if tag == 'img' and 'alt' not in a: self.errors.append('image missing alt')
        if tag == 'svg' and not (a.get('aria-label') or a.get('aria-labelledby') or a.get('aria-hidden') == 'true'):
            self.errors.append('SVG missing accessible name')
        if tag not in VOID: self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f'unexpected closing tag: {tag}')
        else: self.stack.pop()

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)

parsed = {p: Page(p) for p in PAGES}
errors = []
for path, page in parsed.items():
    label = path.relative_to(ROOT)
    if not page.lang or page.h1 != 1 or page.main != 1:
        page.errors.append('require English lang, one H1, and one main landmark')
    for name in ['description', 'viewport', 'canonical', 'og:title', 'og:description', 'og:url', 'twitter:title']:
        if not page.metadata.get(name): page.errors.append(f'missing metadata: {name}')
    for ref in page.refs:
        u = urlsplit(ref)
        if u.scheme or u.netloc: continue
        target = (ROOT / unquote(u.path).lstrip('/')) if u.path.startswith('/') else path.parent / unquote(u.path)
        if not u.path: target = path
        if target.is_dir(): target = target / 'index.html'
        target = target.resolve()
        if not target.is_relative_to(ROOT):
            page.errors.append(f'link outside public root: {ref}')
        elif not target.is_file():
            page.errors.append(f'missing link or asset: {ref}')
        elif u.fragment and target in parsed and unquote(u.fragment) not in parsed[target].ids:
            page.errors.append(f'missing fragment: {ref}')
    errors += [f'{label}: {e}' for e in page.errors]
if errors:
    print('\n'.join(errors), file=sys.stderr)
    sys.exit(1)

with tempfile.TemporaryDirectory(prefix='nithilan-static-') as temp:
    stage = Path(temp) / 'dist'
    stage.mkdir()
    for item in PUBLIC:
        src = ROOT / item
        if src.is_dir(): shutil.copytree(src, stage / item)
        else: shutil.copy2(src, stage / item)
    output = ROOT / 'dist'
    if output.is_symlink(): raise ValueError('Refusing to replace a symlinked output directory')
    if output.exists(): shutil.rmtree(output)
    shutil.copytree(stage, output)
files = [p for p in (ROOT / 'dist').rglob('*') if p.is_file()]
print(f'Validated {len(PAGES)} pages: landmarks, metadata, SVG names, unique IDs, internal links, and assets.')
print(f'Built dist/: {len(files)} public files, {sum(p.stat().st_size for p in files):,} bytes.')
