import { storageService } from './storageService';
import { UserProfile } from '../types/user';

/**
 * Local preview accounts.
 *
 * This build has NO server and NO authentication backend. What follows creates
 * a profile that lives only in this browser's localStorage. It must never be
 * described to users as a secure account, login, or verified identity.
 */

export interface LocalAccountInput {
  fullName: string;
  email: string;
  phone?: string;
  role: 'creator' | 'client';
}

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{6,20}$/;

export function validateName(name: string): ValidationResult {
  const value = name.trim();
  if (value.length < 2) return { ok: false, error: 'Please enter your name.' };
  if (value.length > 80) return { ok: false, error: 'Name is too long.' };
  return { ok: true };
}

export function validateEmail(email: string): ValidationResult {
  const value = email.trim();
  if (!value) return { ok: false, error: 'Please enter your email address.' };
  if (!EMAIL_RE.test(value)) return { ok: false, error: 'Please enter a valid email address.' };
  return { ok: true };
}

export function validatePhone(phone: string): ValidationResult {
  const value = phone.trim();
  if (!value) return { ok: true }; // optional
  if (!PHONE_RE.test(value)) return { ok: false, error: 'Please enter a valid phone number.' };
  return { ok: true };
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32);
}

/**
 * Create or update the local-only preview profile and start a local session.
 */
export function createLocalProfile(input: LocalAccountInput): UserProfile {
  const name = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const isCreator = input.role === 'creator';

  const base = storageService.getCurrentUser();

  // Generate a stable, non-guessable-ish local id.
  const id =
    base.id && base.id !== 'guest'
      ? base.id
      : `local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const updated = storageService.updateCurrentUser({
    id,
    fullName: name,
    displayName: base.displayName && base.displayName !== 'Guest' ? base.displayName : name,
    username: base.username || slugify(name) || 'creator',
    email,
    currentRole: isCreator ? 'creator' : 'client',
    roles: isCreator ? ['creator'] : ['client'],
  });

  storageService.startLocalSession();
  return updated;
}

/** Update the profile that onboarding collects (skills, bio, etc.). */
export function completeOnboarding(updates: Partial<UserProfile>): UserProfile {
  const updated = storageService.updateCurrentUser(updates);
  storageService.startLocalSession();
  return updated;
}

/** Sign out of the local preview session. Does not delete profile data. */
export function signOutLocal(): void {
  storageService.endLocalSession();
}
