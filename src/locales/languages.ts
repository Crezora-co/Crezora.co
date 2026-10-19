/**
 * Interface languages for the CREZORA corporate site.
 *
 * `core` means the landing-page interface has a maintained translation in this
 * build. `planned` means the language is registered and shown honestly in the
 * selector, but is disabled until a real translation exists. The selector must
 * never pretend a planned locale is active.
 */
export type LanguageCode =
  | 'en'
  | 'hi'
  | 'te'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'bn'
  | 'mr'
  | 'gu'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur'
  | 'sa'
  | 'ks'
  | 'kok'
  | 'mni'
  | 'ne'
  | 'brx'
  | 'doi'
  | 'mai'
  | 'sat'
  | 'sd';

export type LanguageCoverage = 'core' | 'planned';

export interface LanguageOption {
  code: LanguageCode;
  englishName: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  coverage: LanguageCoverage;
}

/** English first, then the 22 scheduled Indian languages. */
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', englishName: 'English', nativeName: 'English', direction: 'ltr', coverage: 'core' },
  { code: 'hi', englishName: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', coverage: 'core' },
  { code: 'te', englishName: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr', coverage: 'core' },
  { code: 'ta', englishName: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr', coverage: 'core' },
  { code: 'kn', englishName: 'Kannada', nativeName: 'ಕನ್ನಡ', direction: 'ltr', coverage: 'core' },
  { code: 'ml', englishName: 'Malayalam', nativeName: 'മലയാളം', direction: 'ltr', coverage: 'core' },
  { code: 'bn', englishName: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', coverage: 'core' },
  { code: 'mr', englishName: 'Marathi', nativeName: 'मराठी', direction: 'ltr', coverage: 'core' },
  { code: 'gu', englishName: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr', coverage: 'core' },
  { code: 'pa', englishName: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', direction: 'ltr', coverage: 'core' },
  { code: 'or', englishName: 'Odia', nativeName: 'ଓଡ଼ିଆ', direction: 'ltr', coverage: 'core' },
  { code: 'as', englishName: 'Assamese', nativeName: 'অসমীয়া', direction: 'ltr', coverage: 'core' },
  { code: 'ur', englishName: 'Urdu', nativeName: 'اردو', direction: 'rtl', coverage: 'core' },
  { code: 'sa', englishName: 'Sanskrit', nativeName: 'संस्कृतम्', direction: 'ltr', coverage: 'planned' },
  { code: 'ks', englishName: 'Kashmiri', nativeName: 'کٲشُر', direction: 'rtl', coverage: 'planned' },
  { code: 'kok', englishName: 'Konkani', nativeName: 'कोंकणी', direction: 'ltr', coverage: 'planned' },
  { code: 'mni', englishName: 'Manipuri / Meitei', nativeName: 'মৈতৈলোন্', direction: 'ltr', coverage: 'planned' },
  { code: 'ne', englishName: 'Nepali', nativeName: 'नेपाली', direction: 'ltr', coverage: 'planned' },
  { code: 'brx', englishName: 'Bodo', nativeName: 'बड़ो', direction: 'ltr', coverage: 'planned' },
  { code: 'doi', englishName: 'Dogri', nativeName: 'डोगरी', direction: 'ltr', coverage: 'planned' },
  { code: 'mai', englishName: 'Maithili', nativeName: 'मैथिली', direction: 'ltr', coverage: 'planned' },
  { code: 'sat', englishName: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', direction: 'ltr', coverage: 'planned' },
  { code: 'sd', englishName: 'Sindhi', nativeName: 'سنڌي', direction: 'rtl', coverage: 'planned' },
];

export const ACTIVE_LANGUAGE_CODES = LANGUAGE_OPTIONS.filter(
  (language) => language.coverage === 'core'
).map((language) => language.code);

export const isRtlLanguage = (code: LanguageCode): boolean =>
  LANGUAGE_OPTIONS.find((language) => language.code === code)?.direction === 'rtl';

export const getLanguageOption = (code: LanguageCode): LanguageOption =>
  LANGUAGE_OPTIONS.find((language) => language.code === code) ?? LANGUAGE_OPTIONS[0];

export const isSupportedLanguage = (value: string): value is LanguageCode =>
  LANGUAGE_OPTIONS.some((language) => language.code === value);
