import type { Alumni, Job, CommunityEvent, InterestLead, KeepInTouchSubmission, Announcement, SiteSettings } from '@/types';
import { generateId } from './utils';
import fs from 'fs';
import path from 'path';

export type { KeepInTouchSubmission } from '@/types';

// ─── File-based JSON persistence ───────────────────────────────────────
// Data is stored in /data/*.json files at the project root.
// All reads/writes go through these helpers so data survives server restarts.

const DATA_DIR = path.join(process.cwd(), 'data');

function readJsonFile<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(filePath, '[]', 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

function writeJsonFile<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

function readJsonObject<T extends object>(filename: string, defaults: T): T {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(defaults, null, 2), 'utf-8');
      return defaults;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return { ...defaults, ...JSON.parse(raw) } as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaults;
  }
}

function writeJsonObject<T extends object>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

// ─── Alumni CRUD ───────────────────────────────────────────────────────
export function getAlumni(): Alumni[] {
  return readJsonFile<Alumni>('alumni.json');
}

export function addAlumni(data: Omit<Alumni, 'id' | 'registeredAt'>): Alumni {
  const alumni = readJsonFile<Alumni>('alumni.json');
  const newAlumni: Alumni = {
    ...data,
    id: generateId(),
    registeredAt: new Date().toISOString(),
  };
  alumni.push(newAlumni);
  writeJsonFile('alumni.json', alumni);
  return newAlumni;
}

// ─── Jobs CRUD ─────────────────────────────────────────────────────────
export function getJobs(activeOnly = true): Job[] {
  const jobs = readJsonFile<Job>('jobs.json');
  if (activeOnly) return jobs.filter((j) => j.isActive);
  return jobs;
}

export function getJobById(id: string): Job | undefined {
  const jobs = readJsonFile<Job>('jobs.json');
  return jobs.find((j) => j.id === id);
}

export function addJob(data: Omit<Job, 'id' | 'postedAt'>): Job {
  const jobs = readJsonFile<Job>('jobs.json');
  const newJob: Job = {
    ...data,
    id: generateId(),
    postedAt: new Date().toISOString(),
  };
  jobs.push(newJob);
  writeJsonFile('jobs.json', jobs);
  return newJob;
}

export function updateJob(id: string, data: Partial<Job>): Job | null {
  const jobs = readJsonFile<Job>('jobs.json');
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return null;
  jobs[index] = { ...jobs[index], ...data };
  writeJsonFile('jobs.json', jobs);
  return jobs[index];
}

export function deleteJob(id: string): boolean {
  const jobs = readJsonFile<Job>('jobs.json');
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return false;
  jobs[index].isActive = false;
  writeJsonFile('jobs.json', jobs);
  return true;
}

// ─── Events CRUD ───────────────────────────────────────────────────────
export function getEvents(activeOnly = true): CommunityEvent[] {
  const events = readJsonFile<CommunityEvent>('events.json');
  if (activeOnly) return events.filter((e) => e.isActive);
  return events;
}

export function getEventById(id: string): CommunityEvent | undefined {
  const events = readJsonFile<CommunityEvent>('events.json');
  return events.find((e) => e.id === id);
}

export function addEvent(data: Omit<CommunityEvent, 'id' | 'postedAt'>): CommunityEvent {
  const events = readJsonFile<CommunityEvent>('events.json');
  const newEvent: CommunityEvent = {
    ...data,
    id: generateId(),
    postedAt: new Date().toISOString(),
  };
  events.push(newEvent);
  writeJsonFile('events.json', events);
  return newEvent;
}

export function updateEvent(id: string, data: Partial<CommunityEvent>): CommunityEvent | null {
  const events = readJsonFile<CommunityEvent>('events.json');
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...data };
  writeJsonFile('events.json', events);
  return events[index];
}

export function deleteEvent(id: string): boolean {
  const events = readJsonFile<CommunityEvent>('events.json');
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return false;
  events[index].isActive = false;
  writeJsonFile('events.json', events);
  return true;
}

// ─── Interest Leads ────────────────────────────────────────────────────
export function getLeads(): InterestLead[] {
  return readJsonFile<InterestLead>('leads.json');
}

export function addLead(data: Omit<InterestLead, 'id' | 'submittedAt'>): InterestLead {
  const leads = readJsonFile<InterestLead>('leads.json');
  const newLead: InterestLead = {
    ...data,
    id: generateId(),
    submittedAt: new Date().toISOString(),
  };
  leads.push(newLead);
  writeJsonFile('leads.json', leads);
  return newLead;
}

// ─── Keep In Touch ─────────────────────────────────────────────────────
export function getKeepInTouchSubmissions(): KeepInTouchSubmission[] {
  return readJsonFile<KeepInTouchSubmission>('keep-in-touch.json');
}

export function addKeepInTouchSubmission(
  data: Omit<KeepInTouchSubmission, 'id' | 'createdAt'>
): KeepInTouchSubmission {
  const submissions = readJsonFile<KeepInTouchSubmission>('keep-in-touch.json');
  const newSubmission: KeepInTouchSubmission = {
    ...data,
    id: `kit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  writeJsonFile('keep-in-touch.json', submissions);
  return newSubmission;
}

// ─── Announcements CRUD ──────────────────────────────────────────────
export function getAnnouncements(activeOnly = false): Announcement[] {
  const announcements = readJsonFile<Announcement>('announcements.json');
  if (activeOnly) return announcements.filter((a) => a.isActive);
  return announcements;
}

export function addAnnouncement(data: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
  const announcements = readJsonFile<Announcement>('announcements.json');
  const newAnnouncement: Announcement = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  announcements.push(newAnnouncement);
  writeJsonFile('announcements.json', announcements);
  return newAnnouncement;
}

export function updateAnnouncement(id: string, data: Partial<Announcement>): Announcement | null {
  const announcements = readJsonFile<Announcement>('announcements.json');
  const index = announcements.findIndex((a) => a.id === id);
  if (index === -1) return null;
  announcements[index] = { ...announcements[index], ...data };
  writeJsonFile('announcements.json', announcements);
  return announcements[index];
}

export function deleteAnnouncement(id: string): boolean {
  const announcements = readJsonFile<Announcement>('announcements.json');
  const index = announcements.findIndex((a) => a.id === id);
  if (index === -1) return false;
  announcements[index].isActive = false;
  writeJsonFile('announcements.json', announcements);
  return true;
}

// ─── Site Settings ────────────────────────────────────────────────────
const DEFAULT_SETTINGS: SiteSettings = {
  whatsappLink: process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://chat.whatsapp.com/example',
  instagramUrl: 'https://www.instagram.com/noal.arab/',
  facebookUrl: 'https://www.facebook.com/noal.arab',
  youtubeUrl: 'https://www.youtube.com/channel/UCpj6JtKiRv0gNsU6ArrUtKg',
  contactEmail: 'arab@noal.org.il',
  contactPhone: '',
};

export function getSiteSettings(): SiteSettings {
  return readJsonObject<SiteSettings>('settings.json', DEFAULT_SETTINGS);
}

export function updateSiteSettings(data: Partial<SiteSettings>): SiteSettings {
  const current = getSiteSettings();
  const updated = { ...current, ...data };
  writeJsonObject('settings.json', updated);
  return updated;
}
