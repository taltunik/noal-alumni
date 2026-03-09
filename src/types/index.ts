export interface Alumni {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  town: string;
  birthYear: number;
  currentJob?: string;
  yearActive?: string;
  branch?: string;
  registeredAt: string;
}

export interface Job {
  id: string;
  title: string;
  titleAr?: string;
  titleHe?: string;
  titleEn?: string;
  company: string;
  location: string;
  description: string;
  descriptionAr?: string;
  descriptionHe?: string;
  descriptionEn?: string;
  type: 'full-time' | 'part-time' | 'volunteer';
  contactPhone?: string;
  contactEmail?: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'pdf';
  postedAt: string;
  isActive: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleAr?: string;
  titleHe?: string;
  titleEn?: string;
  description: string;
  descriptionAr?: string;
  descriptionHe?: string;
  descriptionEn?: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  isActive: boolean;
  postedAt: string;
}

export interface InterestLead {
  id: string;
  fullName: string;
  phone: string;
  relatedItemId: string;
  relatedItemType: 'job' | 'event';
  submittedAt: string;
}

export interface KeepInTouchSubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  town: string;
  currentJob: string;
  yearActive: string;
  branch: string;
  memories: string;
  wantToVolunteer: string;
  createdAt: string;
}

export interface Town {
  value: string;
  labelHe: string;
  labelAr: string;
  labelEn: string;
}

export interface Announcement {
  id: string;
  title: string;
  titleAr?: string;
  titleHe?: string;
  titleEn?: string;
  content: string;
  contentAr?: string;
  contentHe?: string;
  contentEn?: string;
  link?: string;
  color: 'primary' | 'accent' | 'success' | 'warning';
  isActive: boolean;
  createdAt: string;
}

export interface SiteSettings {
  whatsappLink: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  contactEmail: string;
  contactPhone: string;
}
