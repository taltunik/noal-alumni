'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { Job, CommunityEvent, InterestLead, Alumni, KeepInTouchSubmission, Announcement, SiteSettings } from '@/types';

type Tab = 'jobs' | 'events' | 'leads' | 'registrations' | 'keepInTouch' | 'announcements' | 'settings';

export default function AdminDashboardContent() {
  const t = useTranslations('admin');
  const router = useRouter();

  const [tab, setTab] = useState<Tab>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [leads, setLeads] = useState<InterestLead[]>([]);
  const [registrations, setRegistrations] = useState<Alumni[]>([]);
  const [keepInTouch, setKeepInTouch] = useState<KeepInTouchSubmission[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const [showJobForm, setShowJobForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const [previewJob, setPreviewJob] = useState<Job | null>(null);
  const [previewEvent, setPreviewEvent] = useState<CommunityEvent | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [jobsRes, eventsRes, subsRes, annRes, settingsRes] = await Promise.all([
        fetch('/api/admin/jobs'),
        fetch('/api/admin/events'),
        fetch('/api/admin/submissions'),
        fetch('/api/admin/announcements'),
        fetch('/api/admin/settings'),
      ]);
      if (jobsRes.ok) { const d = await jobsRes.json(); setJobs(d.jobs || []); }
      if (eventsRes.ok) { const d = await eventsRes.json(); setEvents(d.events || []); }
      if (subsRes.ok) {
        const d = await subsRes.json();
        setLeads(d.leads || []);
        setRegistrations(d.registrations || []);
        setKeepInTouch(d.keepInTouch || []);
      }
      if (annRes.ok) { const d = await annRes.json(); setAnnouncements(d.announcements || []); }
      if (settingsRes.ok) { const d = await settingsRes.json(); setSettings(d.settings || null); }
    } catch { toast.error('Error loading data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
    router.refresh();
  }

  async function handleDeleteJob(id: string) {
    if (!confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch('/api/admin/jobs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      if (res.ok) { toast.success('✓'); fetchData(); }
    } catch { toast.error('Error'); }
  }

  async function handleDeleteEvent(id: string) {
    if (!confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch('/api/admin/events', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      if (res.ok) { toast.success('✓'); fetchData(); }
    } catch { toast.error('Error'); }
  }

  async function handleDeleteAnnouncement(id: string) {
    if (!confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch('/api/admin/announcements', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      if (res.ok) { toast.success('✓'); fetchData(); }
    } catch { toast.error('Error'); }
  }

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'jobs', label: t('jobsTab'), count: jobs.filter(j => j.isActive).length },
    { key: 'events', label: t('eventsTab'), count: events.filter(e => e.isActive).length },
    { key: 'leads', label: t('leadsTab'), count: leads.length },
    { key: 'registrations', label: t('registrationsTab'), count: registrations.length },
    { key: 'keepInTouch', label: t('keepInTouchTab'), count: keepInTouch.length },
    { key: 'announcements', label: t('announcementsTab'), count: announcements.filter(a => a.isActive).length },
    { key: 'settings', label: t('settingsTab') },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t('dashboard')}</h1>
          <p className="text-sm text-muted mt-1">
            {jobs.filter(j => j.isActive).length} {t('jobsTab')} · {events.filter(e => e.isActive).length} {t('eventsTab')} · {registrations.length} {t('registrationsTab')}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>{t('logout')}</Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-1 rounded-lg bg-white border border-border p-1">
        {TABS.map(({ key, label, count }) => (
          <button key={key} onClick={() => setTab(key)} className={clsx(
            'rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5',
            tab === key ? 'bg-primary text-white' : 'text-foreground hover:bg-card-hover'
          )}>
            {label}
            {count !== undefined && count > 0 && (
              <span className={clsx('inline-flex items-center justify-center min-w-[20px] h-5 rounded-full text-xs font-bold px-1.5', tab === key ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary')}>{count}</span>
            )}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}

      {/* Jobs Tab */}
      {!loading && tab === 'jobs' && (
        <div>
          <div className="mb-4">
            <Button variant="primary" size="sm" onClick={() => { setEditingJob(null); setShowJobForm(true); }}>+ {t('addJob')}</Button>
          </div>
          {showJobForm && <JobForm job={editingJob} onSave={() => { setShowJobForm(false); setEditingJob(null); fetchData(); }} onCancel={() => { setShowJobForm(false); setEditingJob(null); }} />}
          {jobs.length === 0 ? <p className="text-muted py-8 text-center">{t('noJobs')}</p> : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card-hover">
                  <tr>
                    <th className="px-4 py-3 text-start font-medium">{t('title')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('company')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('location')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('jobType')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('attachment')}</th>
                    <th className="px-4 py-3 text-start font-medium">Status</th>
                    <th className="px-4 py-3 text-start font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{job.title}</td>
                      <td className="px-4 py-3">{job.company}</td>
                      <td className="px-4 py-3">{job.location}</td>
                      <td className="px-4 py-3">{job.type}</td>
                      <td className="px-4 py-3">
                        {job.attachmentUrl ? (
                          <span className={clsx('rounded-full px-2 py-0.5 text-xs', job.attachmentType === 'pdf' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700')}>
                            {job.attachmentType === 'pdf' ? 'PDF' : 'IMG'}
                          </span>
                        ) : <span className="text-xs text-muted">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {job.isActive ? t('active') : t('inactive')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setPreviewJob(job)} className="text-green-600 hover:underline cursor-pointer text-xs">{t('preview')}</button>
                          <button onClick={() => { setEditingJob(job); setShowJobForm(true); }} className="text-primary hover:underline cursor-pointer text-xs">{t('edit')}</button>
                          <button onClick={() => handleDeleteJob(job.id)} className="text-accent hover:underline cursor-pointer text-xs">{t('delete')}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Events Tab */}
      {!loading && tab === 'events' && (
        <div>
          <div className="mb-4">
            <Button variant="primary" size="sm" onClick={() => { setEditingEvent(null); setShowEventForm(true); }}>+ {t('addEvent')}</Button>
          </div>
          {showEventForm && <EventForm event={editingEvent} onSave={() => { setShowEventForm(false); setEditingEvent(null); fetchData(); }} onCancel={() => { setShowEventForm(false); setEditingEvent(null); }} />}
          {events.length === 0 ? <p className="text-muted py-8 text-center">{t('noEvents')}</p> : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card-hover">
                  <tr>
                    <th className="px-4 py-3 text-start font-medium">{t('title')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('eventDate')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('eventTime')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('location')}</th>
                    <th className="px-4 py-3 text-start font-medium">Status</th>
                    <th className="px-4 py-3 text-start font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{event.title}</td>
                      <td className="px-4 py-3" dir="ltr">{event.date}</td>
                      <td className="px-4 py-3" dir="ltr">{event.time}</td>
                      <td className="px-4 py-3">{event.location}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${event.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {event.isActive ? t('active') : t('inactive')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setPreviewEvent(event)} className="text-green-600 hover:underline cursor-pointer text-xs">{t('preview')}</button>
                          <button onClick={() => { setEditingEvent(event); setShowEventForm(true); }} className="text-primary hover:underline cursor-pointer text-xs">{t('edit')}</button>
                          <button onClick={() => handleDeleteEvent(event.id)} className="text-accent hover:underline cursor-pointer text-xs">{t('delete')}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Leads Tab */}
      {!loading && tab === 'leads' && (
        <div>
          {leads.length === 0 ? <p className="text-muted py-8 text-center">{t('noLeads')}</p> : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card-hover"><tr><th className="px-4 py-3 text-start font-medium">{t('name')}</th><th className="px-4 py-3 text-start font-medium">{t('phone')}</th><th className="px-4 py-3 text-start font-medium">{t('type')}</th><th className="px-4 py-3 text-start font-medium">{t('itemId')}</th><th className="px-4 py-3 text-start font-medium">{t('date')}</th></tr></thead>
                <tbody>{leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-border">
                    <td className="px-4 py-3">{lead.fullName}</td>
                    <td className="px-4 py-3" dir="ltr">{lead.phone}</td>
                    <td className="px-4 py-3"><span className={clsx('rounded-full px-2 py-0.5 text-xs', lead.relatedItemType === 'job' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800')}>{lead.relatedItemType}</span></td>
                    <td className="px-4 py-3 text-xs text-muted">{lead.relatedItemId}</td>
                    <td className="px-4 py-3 text-xs text-muted" dir="ltr">{new Date(lead.submittedAt).toLocaleDateString()}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Registrations Tab */}
      {!loading && tab === 'registrations' && (
        <div>
          {registrations.length === 0 ? <p className="text-muted py-8 text-center">{t('noRegistrations')}</p> : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card-hover"><tr><th className="px-4 py-3 text-start font-medium">{t('name')}</th><th className="px-4 py-3 text-start font-medium">{t('phone')}</th><th className="px-4 py-3 text-start font-medium">{t('town')}</th><th className="px-4 py-3 text-start font-medium">{t('birthYear')}</th><th className="px-4 py-3 text-start font-medium">{t('date')}</th></tr></thead>
                <tbody>{registrations.map((a) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{a.fullName}</td>
                    <td className="px-4 py-3" dir="ltr">{a.phone}</td>
                    <td className="px-4 py-3">{a.town}</td>
                    <td className="px-4 py-3" dir="ltr">{a.birthYear}</td>
                    <td className="px-4 py-3 text-xs text-muted" dir="ltr">{new Date(a.registeredAt).toLocaleDateString()}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Keep In Touch Tab */}
      {!loading && tab === 'keepInTouch' && (
        <div>
          {keepInTouch.length === 0 ? <p className="text-muted py-8 text-center">{t('noKeepInTouch')}</p> : (
            <div className="space-y-4">
              {keepInTouch.map((sub) => (
                <div key={sub.id} className="rounded-lg border border-border bg-white p-4 shadow-sm">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div><span className="text-xs text-muted">{t('name')}</span><p className="font-medium">{sub.fullName}</p></div>
                    <div><span className="text-xs text-muted">{t('phone')}</span><p dir="ltr">{sub.phone || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('email')}</span><p dir="ltr">{sub.email || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('town')}</span><p>{sub.town || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('currentJob')}</span><p>{sub.currentJob || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('yearsActive')}</span><p dir="ltr">{sub.yearActive || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('branch')}</span><p>{sub.branch || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('volunteer')}</span><p>{sub.wantToVolunteer || '—'}</p></div>
                    <div><span className="text-xs text-muted">{t('date')}</span><p className="text-sm text-muted" dir="ltr">{new Date(sub.createdAt).toLocaleDateString()}</p></div>
                  </div>
                  {sub.memories && <div className="mt-3 border-t border-border pt-3"><p className="text-sm italic">&ldquo;{sub.memories}&rdquo;</p></div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Announcements Tab */}
      {!loading && tab === 'announcements' && (
        <div>
          <div className="mb-4">
            <Button variant="primary" size="sm" onClick={() => { setEditingAnnouncement(null); setShowAnnouncementForm(true); }}>+ {t('addAnnouncement')}</Button>
          </div>
          {showAnnouncementForm && (
            <AnnouncementForm
              announcement={editingAnnouncement}
              onSave={() => { setShowAnnouncementForm(false); setEditingAnnouncement(null); fetchData(); }}
              onCancel={() => { setShowAnnouncementForm(false); setEditingAnnouncement(null); }}
            />
          )}
          {announcements.length === 0 ? <p className="text-muted py-8 text-center">{t('noAnnouncements')}</p> : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card-hover">
                  <tr>
                    <th className="px-4 py-3 text-start font-medium">{t('announcementTitle')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('announcementColor')}</th>
                    <th className="px-4 py-3 text-start font-medium">{t('announcementLink')}</th>
                    <th className="px-4 py-3 text-start font-medium">Status</th>
                    <th className="px-4 py-3 text-start font-medium">{t('date')}</th>
                    <th className="px-4 py-3 text-start font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((ann) => {
                    const colorMap: Record<string, string> = {
                      primary: 'bg-blue-100 text-blue-800',
                      accent: 'bg-red-100 text-red-800',
                      success: 'bg-green-100 text-green-800',
                      warning: 'bg-amber-100 text-amber-800',
                    };
                    const colorLabelMap: Record<string, string> = {
                      primary: t('colorPrimary'),
                      accent: t('colorAccent'),
                      success: t('colorSuccess'),
                      warning: t('colorWarning'),
                    };
                    return (
                      <tr key={ann.id} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{ann.title}</td>
                        <td className="px-4 py-3">
                          <span className={clsx('rounded-full px-2 py-0.5 text-xs', colorMap[ann.color] || 'bg-gray-100 text-gray-800')}>
                            {colorLabelMap[ann.color] || ann.color}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted">{ann.link ? <a href={ann.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{ann.link.substring(0, 30)}...</a> : '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${ann.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {ann.isActive ? t('active') : t('inactive')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted" dir="ltr">{new Date(ann.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => { setEditingAnnouncement(ann); setShowAnnouncementForm(true); }} className="text-primary hover:underline cursor-pointer text-xs">{t('edit')}</button>
                            <button onClick={() => handleDeleteAnnouncement(ann.id)} className="text-accent hover:underline cursor-pointer text-xs">{t('delete')}</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {!loading && tab === 'settings' && settings && (
        <SettingsForm settings={settings} onSave={fetchData} />
      )}

      {/* Preview Modals */}
      {previewJob && <PreviewModal onClose={() => setPreviewJob(null)} title={t('previewTitle')}><JobPreviewCard job={previewJob} /></PreviewModal>}
      {previewEvent && <PreviewModal onClose={() => setPreviewEvent(null)} title={t('previewTitle')}><EventPreviewCard event={previewEvent} /></PreviewModal>}
    </div>
  );
}

/* ═══ Preview Modal ═══ */
function PreviewModal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  const t = useTranslations('admin');
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-xl bg-background p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-card-hover hover:text-foreground transition-colors cursor-pointer">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <p className="text-xs text-muted mb-4 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Preview — this is how it will appear on the public site
        </p>
        {children}
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>{t('closePreview')}</Button>
        </div>
      </div>
    </div>
  );
}

/* ═══ Job Preview Card ═══ */
function JobPreviewCard({ job }: { job: Job }) {
  const t = useTranslations('admin');
  const typeLabel = job.type === 'full-time' ? 'Full Time' : job.type === 'part-time' ? 'Part Time' : 'Volunteer';
  const typeBg = job.type === 'full-time' ? 'bg-primary/10 text-primary' : job.type === 'part-time' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800';

  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      {job.attachmentUrl && job.attachmentType === 'image' && (
        <div className="mb-4 rounded-lg overflow-hidden border border-border">
          <Image src={job.attachmentUrl} alt={job.title} width={500} height={300} className="w-full h-48 object-cover" />
        </div>
      )}
      {job.attachmentUrl && job.attachmentType === 'pdf' && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <svg className="h-8 w-8 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">PDF {t('attachment')}</p>
            <a href={job.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 hover:underline">{t('viewPdf')} &rarr;</a>
          </div>
        </div>
      )}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${typeBg}`}>{typeLabel}</span>
      </div>
      <p className="text-sm font-medium text-primary mb-1">{job.company}</p>
      <div className="flex items-center gap-1 text-sm text-muted mb-3">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <span>{job.location}</span>
      </div>
      <p className="text-sm text-muted mb-4">{job.description}</p>
      <div className="w-full rounded-lg bg-primary text-white py-2 text-center text-sm font-medium">Interested / مهتم</div>
    </div>
  );
}

/* ═══ Event Preview Card ═══ */
function EventPreviewCard({ event }: { event: CommunityEvent }) {
  return (
    <div className="rounded-xl bg-card border border-border border-s-4 border-s-accent p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
      <div className="flex flex-wrap gap-4 text-sm text-muted mb-3">
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>{event.location}</span>
        </div>
      </div>
      <p className="text-sm text-muted mb-4">{event.description}</p>
      <div className="w-full rounded-lg bg-accent text-white py-2 text-center text-sm font-medium">Interested / مهتم</div>
    </div>
  );
}

/* ═══ Job Form (with file upload) ═══ */
function JobForm({ job, onSave, onCancel }: { job: Job | null; onSave: () => void; onCancel: () => void }) {
  const t = useTranslations('admin');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: job?.title || '', titleHe: job?.titleHe || '', titleEn: job?.titleEn || '',
    company: job?.company || '', location: job?.location || '',
    description: job?.description || '', descriptionHe: job?.descriptionHe || '', descriptionEn: job?.descriptionEn || '',
    type: job?.type || 'full-time',
    contactEmail: job?.contactEmail || '', contactPhone: job?.contactPhone || '',
    isActive: job?.isActive !== false,
    attachmentUrl: job?.attachmentUrl || '', attachmentType: (job?.attachmentType || '') as string,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, attachmentUrl: data.url, attachmentType: data.type }));
        toast.success('✓');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Upload failed');
      }
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = job ? 'PUT' : 'POST';
      const body = job ? { id: job.id, ...formData } : formData;
      const res = await fetch('/api/admin/jobs', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success('Saved!'); onSave(); }
      else toast.error('Error saving');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  }

  return (
    <div className="mb-6 rounded-xl bg-white p-6 border border-border shadow-sm">
      <h3 className="mb-4 text-lg font-bold">{job ? t('edit') : t('addJob')}</h3>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Input id="job-title" label={`${t('title')} (عربي)`} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        <Input id="job-title-he" label={`${t('title')} (עברית)`} value={formData.titleHe} onChange={(e) => setFormData({ ...formData, titleHe: e.target.value })} />
        <Input id="job-title-en" label={`${t('title')} (English)`} value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} />
        <Input id="job-company" label={t('company')} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
        <Input id="job-location" label={t('location')} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t('jobType')}</label>
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as Job['type'] })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5">
            <option value="full-time">Full Time</option><option value="part-time">Part Time</option><option value="volunteer">Volunteer</option>
          </select>
        </div>
        <Input id="job-email" label={t('contactEmail')} type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} />
        <Input id="job-phone" label={t('contactPhone')} type="tel" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} dir="ltr" />

        {/* File Upload */}
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">{t('uploadFile')}</label>
          {formData.attachmentUrl ? (
            <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-3">
              {formData.attachmentType === 'image' ? (
                <Image src={formData.attachmentUrl} alt="attachment" width={80} height={60} className="rounded-md object-cover h-16 w-20" />
              ) : (
                <div className="flex items-center justify-center h-16 w-20 rounded-md bg-red-50 border border-red-200">
                  <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{formData.attachmentUrl.split('/').pop()}</p>
                <p className="text-xs text-muted">{formData.attachmentType === 'pdf' ? 'PDF' : 'Image'}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs text-primary hover:underline cursor-pointer">{t('changeFile')}</button>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, attachmentUrl: '', attachmentType: '' }))} className="text-xs text-accent hover:underline cursor-pointer">{t('removeFile')}</button>
              </div>
            </div>
          ) : (
            <div onClick={() => !uploading && fileInputRef.current?.click()} className={clsx('flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-8 transition-colors cursor-pointer', uploading ? 'bg-primary/5 cursor-wait' : 'hover:border-primary hover:bg-primary/5')}>
              {uploading ? (
                <><div className="h-6 w-6 animate-spin rounded-full border-3 border-primary border-t-transparent mb-2" /><span className="text-sm text-muted">{t('uploading')}</span></>
              ) : (
                <><svg className="h-8 w-8 text-muted mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg><span className="text-sm text-muted">{t('uploadFile')}</span><span className="text-xs text-muted mt-1">JPG, PNG, WebP, PDF — max 5MB</span></>
              )}
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={handleFileUpload} className="hidden" />
        </div>

        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('description')} (عربي)</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('description')} (עברית)</label><textarea value={formData.descriptionHe} onChange={(e) => setFormData({ ...formData, descriptionHe: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('description')} (English)</label><textarea value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>

        {job && (
          <div className="md:col-span-2 flex items-center gap-3">
            <label className="text-sm font-medium">Status:</label>
            <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })} className={clsx('rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer', formData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
              {formData.isActive ? t('active') : t('inactive')}
            </button>
          </div>
        )}
        <div className="md:col-span-2 flex gap-3">
          <Button type="submit" variant="primary" isLoading={saving}>{t('save')}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>{t('cancel')}</Button>
        </div>
      </form>
    </div>
  );
}

/* ═══ Event Form ═══ */
function EventForm({ event, onSave, onCancel }: { event: CommunityEvent | null; onSave: () => void; onCancel: () => void }) {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState({
    title: event?.title || '', titleHe: event?.titleHe || '', titleEn: event?.titleEn || '',
    description: event?.description || '', descriptionHe: event?.descriptionHe || '', descriptionEn: event?.descriptionEn || '',
    date: event?.date || '', time: event?.time || '', location: event?.location || '',
    isActive: event?.isActive !== false,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = event ? 'PUT' : 'POST';
      const body = event ? { id: event.id, ...formData } : formData;
      const res = await fetch('/api/admin/events', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success('Saved!'); onSave(); }
      else toast.error('Error saving');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  }

  return (
    <div className="mb-6 rounded-xl bg-white p-6 border border-border shadow-sm">
      <h3 className="mb-4 text-lg font-bold">{event ? t('edit') : t('addEvent')}</h3>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Input id="event-title" label={`${t('title')} (عربي)`} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        <Input id="event-title-he" label={`${t('title')} (עברית)`} value={formData.titleHe} onChange={(e) => setFormData({ ...formData, titleHe: e.target.value })} />
        <Input id="event-title-en" label={`${t('title')} (English)`} value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} />
        <Input id="event-location" label={t('location')} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
        <Input id="event-date" label={t('eventDate')} type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required dir="ltr" />
        <Input id="event-time" label={t('eventTime')} type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required dir="ltr" />
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('description')} (عربي)</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('description')} (עברית)</label><textarea value={formData.descriptionHe} onChange={(e) => setFormData({ ...formData, descriptionHe: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('description')} (English)</label><textarea value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        {event && (
          <div className="md:col-span-2 flex items-center gap-3">
            <label className="text-sm font-medium">Status:</label>
            <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })} className={clsx('rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer', formData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
              {formData.isActive ? t('active') : t('inactive')}
            </button>
          </div>
        )}
        <div className="md:col-span-2 flex gap-3">
          <Button type="submit" variant="primary" isLoading={saving}>{t('save')}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>{t('cancel')}</Button>
        </div>
      </form>
    </div>
  );
}

/* ═══ Announcement Form ═══ */
function AnnouncementForm({ announcement, onSave, onCancel }: { announcement: Announcement | null; onSave: () => void; onCancel: () => void }) {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    titleHe: announcement?.titleHe || '',
    titleEn: announcement?.titleEn || '',
    content: announcement?.content || '',
    contentHe: announcement?.contentHe || '',
    contentEn: announcement?.contentEn || '',
    link: announcement?.link || '',
    color: announcement?.color || 'primary' as Announcement['color'],
    isActive: announcement?.isActive !== false,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = announcement ? 'PUT' : 'POST';
      const body = announcement ? { id: announcement.id, ...formData } : formData;
      const res = await fetch('/api/admin/announcements', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success('Saved!'); onSave(); }
      else toast.error('Error saving');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  }

  const colorOptions: { value: Announcement['color']; label: string; bg: string }[] = [
    { value: 'primary', label: t('colorPrimary'), bg: 'bg-blue-500' },
    { value: 'accent', label: t('colorAccent'), bg: 'bg-red-500' },
    { value: 'success', label: t('colorSuccess'), bg: 'bg-green-500' },
    { value: 'warning', label: t('colorWarning'), bg: 'bg-amber-500' },
  ];

  return (
    <div className="mb-6 rounded-xl bg-white p-6 border border-border shadow-sm">
      <h3 className="mb-4 text-lg font-bold">{announcement ? t('edit') : t('addAnnouncement')}</h3>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Input id="ann-title" label={`${t('announcementTitle')} (عربي)`} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        <Input id="ann-title-he" label={`${t('announcementTitle')} (עברית)`} value={formData.titleHe} onChange={(e) => setFormData({ ...formData, titleHe: e.target.value })} />
        <Input id="ann-title-en" label={`${t('announcementTitle')} (English)`} value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} />
        <Input id="ann-link" label={t('announcementLink')} value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} dir="ltr" />

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">{t('announcementColor')}</label>
          <div className="flex gap-3">
            {colorOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormData({ ...formData, color: opt.value })}
                className={clsx(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border-2 transition-colors cursor-pointer',
                  formData.color === opt.value ? 'border-foreground bg-card-hover' : 'border-transparent bg-background hover:bg-card-hover'
                )}
              >
                <span className={clsx('h-4 w-4 rounded-full', opt.bg)} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('announcementContent')} (عربي)</label><textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('announcementContent')} (עברית)</label><textarea value={formData.contentHe} onChange={(e) => setFormData({ ...formData, contentHe: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        <div className="md:col-span-2"><label className="mb-1.5 block text-sm font-medium">{t('announcementContent')} (English)</label><textarea value={formData.contentEn} onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" /></div>

        {announcement && (
          <div className="md:col-span-2 flex items-center gap-3">
            <label className="text-sm font-medium">Status:</label>
            <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })} className={clsx('rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer', formData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
              {formData.isActive ? t('active') : t('inactive')}
            </button>
          </div>
        )}
        <div className="md:col-span-2 flex gap-3">
          <Button type="submit" variant="primary" isLoading={saving}>{t('save')}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>{t('cancel')}</Button>
        </div>
      </form>
    </div>
  );
}

/* ═══ Settings Form ═══ */
function SettingsForm({ settings, onSave }: { settings: SiteSettings; onSave: () => void }) {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { toast.success(t('settingsSaved')); onSave(); }
      else toast.error('Error saving');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  }

  return (
    <div className="rounded-xl bg-white p-6 border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Social Links Section */}
        <div>
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            {t('socialLinks')}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="settings-whatsapp" label={t('whatsappLink')} value={formData.whatsappLink} onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })} dir="ltr" />
            <Input id="settings-instagram" label={t('instagramUrl')} value={formData.instagramUrl} onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })} dir="ltr" />
            <Input id="settings-facebook" label={t('facebookUrl')} value={formData.facebookUrl} onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })} dir="ltr" />
            <Input id="settings-youtube" label={t('youtubeUrl')} value={formData.youtubeUrl} onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })} dir="ltr" />
          </div>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {t('contactInfo')}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="settings-email" label={t('contactEmailSetting')} type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} dir="ltr" />
            <Input id="settings-phone" label={t('contactPhoneSetting')} type="tel" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} dir="ltr" />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Button type="submit" variant="primary" isLoading={saving}>{t('save')}</Button>
        </div>
      </form>
    </div>
  );
}
