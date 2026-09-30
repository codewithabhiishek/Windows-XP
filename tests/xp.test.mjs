import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('index.html contains all essential Windows XP desktop components and icons', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

  // Verify desktop and taskbar containers
  assert.ok(html.includes('id="desktop"'), 'Missing desktop element');
  assert.ok(html.includes('id="taskbar"'), 'Missing taskbar element');
  assert.ok(html.includes('id="start-button"'), 'Missing start button');
  assert.ok(html.includes('id="start-menu"'), 'Missing start menu');

  // Verify classic XP application icons
  const requiredApps = [
    'myComputer',
    'chrome',
    'notepad',
    'minesweeper',
    'recycleBin',
    'paint',
    'mediaPlayer',
    'calculator',
  ];

  for (const app of requiredApps) {
    assert.ok(html.includes(`data-app="${app}"`), `Missing desktop icon for app: ${app}`);
  }
});

test('index.html contains full OpenGraph and Twitter card SEO metadata', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

  assert.ok(html.includes('<meta property="og:title"'), 'Missing og:title');
  assert.ok(html.includes('<meta property="og:description"'), 'Missing og:description');
  assert.ok(html.includes('<meta property="og:image"'), 'Missing og:image');
  assert.ok(html.includes('<meta name="twitter:card"'), 'Missing twitter:card');
  assert.ok(html.includes('<meta name="twitter:title"'), 'Missing twitter:title');
  assert.ok(html.includes('<meta name="description"'), 'Missing meta description');
});

test('Classic Bliss wallpaper and branding assets exist and have valid sizes', () => {
  const blissPath = path.join(rootDir, 'public/bliss.jpg');
  assert.ok(fs.existsSync(blissPath), 'Missing Bliss wallpaper');
  const blissStats = fs.statSync(blissPath);
  assert.ok(blissStats.size > 50000, `Bliss wallpaper too small (${blissStats.size} bytes)`);

  const screenshotPath = path.join(rootDir, 'public/screenshot.png');
  assert.ok(fs.existsSync(screenshotPath), 'Missing screenshot preview');

  // Favicons
  assert.ok(fs.existsSync(path.join(rootDir, 'public/favicon.ico')), 'Missing favicon.ico');
  assert.ok(fs.existsSync(path.join(rootDir, 'public/favicon.svg')), 'Missing favicon.svg');
  assert.ok(fs.existsSync(path.join(rootDir, 'public/favicon.png')), 'Missing favicon.png');
});

test('Authentic Windows XP audio assets exist in public/sounds/', () => {
  const startupSound = path.join(rootDir, 'public/sounds/startup.mp3');
  const chordSound = path.join(rootDir, 'public/sounds/chord.wav');

  assert.ok(fs.existsSync(startupSound), 'Missing startup sound');
  assert.ok(fs.existsSync(chordSound), 'Missing chord error sound');
});
