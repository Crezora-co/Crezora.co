// Honesty & structure verification for the KalaaVerse Early Access build.
//
// This script performs static checks against the source tree. It intentionally
// does NOT assert the presence of any invented people or metrics — its job is to
// catch regressions that would make the product dishonest or unlaunchable.
//
// Run with: node test_verification.js   (or: cmd /c "node test_verification.js")

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

let passed = 0;
let failed = 0;
const failures = [];

function check(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`  \u2713 ${name}`);
  } else {
    failed++;
    failures.push(`${name}${detail ? ' — ' + detail : ''}`);
    console.log(`  \u2717 ${name}${detail ? ' — ' + detail : ''}`);
  }
}

function collectFiles(dir, exts, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) collectFiles(full, exts, acc);
    else if (exts.includes(extname(full))) acc.push(full);
  }
  return acc;
}

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

const tsxFiles = collectFiles(SRC, ['.ts', '.tsx']);

console.log('\n=== KALAAVERSE HONESTY & STRUCTURE CHECKS ===\n');

// 1. Feature flags must reflect reality.
console.log('Configuration');
const site = read(join(SRC, 'config', 'site.ts'));
check('config/site.ts exists', site.length > 0);
check('payments feature flag is false', /payments:\s*false/.test(site));
check('marketplace feature flag is false', /marketplace:\s*false/.test(site));
check('adminConsole feature flag is false', /adminConsole:\s*false/.test(site));
check('aiAssistant feature flag is false', /aiAssistant:\s*false/.test(site));
check(
  'translation engine is gated on an endpoint',
  /translationEngine:\s*SITE\.translationEndpoint\.length\s*>\s*0/.test(site) ||
    /translationEngine:\s*SITE\.translationEndpoint/.test(site)
);

// 2. No fabricated escrow / verification marketing.
console.log('\nHonesty');
const escrowOffenders = tsxFiles.filter(
  (f) => /milestone\s+escrow|escrow\s+protection/i.test(read(f))
);
check('no "milestone escrow" claims remain', escrowOffenders.length === 0, escrowOffenders.join(', '));

const guaranteeOffenders = tsxFiles.filter((f) =>
  /guaranteed\s+payouts?|guarantee[a-z]*\s+(payments?|getting paid)/i.test(read(f))
);
check('no "guaranteed payout" claims remain', guaranteeOffenders.length === 0, guaranteeOffenders.join(', '));

// 3. Sample profiles must be labelled.
console.log('\nSample data');
const mock = read(join(SRC, 'data', 'mockCreators.ts'));
const sampleCount = (mock.match(/isSample:\s*true/g) || []).length;
check('at least 3 labelled sample profiles', sampleCount >= 3, `found ${sampleCount}`);

// 4. No password collection anywhere (there is no auth backend).
console.log('\nAuthentication');
const passwordOffenders = tsxFiles.filter((f) => /type=["']password["']/.test(read(f)));
check('no password inputs exist', passwordOffenders.length === 0, passwordOffenders.join(', '));

const auth = read(join(SRC, 'services', 'authService.ts'));
check('authService documents local-only profiles', /local-only|local only|localStorage/i.test(auth));

// 5. Fake success alerts must be gone from key screens.
console.log('\nNo simulated success');
const alertSensitive = [
  'views/discover/DiscoverView.tsx',
  'views/profile/ProfileView.tsx',
  'views/marketplace/MarketplaceView.tsx',
  'views/community/CommunityView.tsx',
];
for (const rel of alertSensitive) {
  const body = read(join(SRC, rel));
  check(`no alert() in ${rel}`, !/\balert\s*\(/.test(body));
}

// 6. Translation must not be simulated.
console.log('\nTranslation');
const translation = read(join(SRC, 'views', 'translation', 'TranslationPortalView.tsx'));
check('translation studio references the feature flag', /translationEngine/.test(translation));
check(
  'translation studio does not hardcode a fake result',
  !/setOutput\(['"`][A-Za-z\u0900-\u0DFF]/.test(translation)
);

// 7. Legal pages must be reachable by name.
console.log('\nStructure');
check('privacy view exists', existsSync(join(SRC, 'views', 'legal', 'LegalView.tsx')));
check('contact view exists', existsSync(join(SRC, 'views', 'contact', 'ContactView.tsx')));
check('compact footer exists', existsSync(join(SRC, 'components', 'common', 'CompactFooter.tsx')));

console.log('\n==============================================');
console.log(`${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}
console.log('ALL CHECKS PASSED');
console.log('==============================================\n');
