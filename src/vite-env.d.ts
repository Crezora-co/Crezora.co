/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_CONTACT_EMAIL?: string;
  /** Optional HTTPS endpoint (server-side proxy) that performs real translation. */
  readonly VITE_TRANSLATION_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
