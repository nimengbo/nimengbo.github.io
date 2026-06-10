import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'index.html',
  '404.html',
  'css/main.css',
  'vendors/jquery/index.js',
  'vendors/font-awesome/css/font-awesome.min.css',
  'images/avatar.jpg'
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length) {
  console.error(`Missing required site files:\n${missing.map((file) => `- ${file}`).join('\n')}`);
  process.exit(1);
}

const index = readFileSync(join(root, 'index.html'), 'utf8');
const staleMarkers = ['http://yoursite.com', 'static.duoshuo.com'];
const stale = staleMarkers.filter((marker) => index.includes(marker));
if (stale.length) {
  console.error(`Stale generated-site markers found in index.html: ${stale.join(', ')}`);
  process.exit(1);
}

console.log('Site check passed. Run npm start and open http://localhost:5173/');
