
// Basic fetch wrapper for Payload CMS API
// Using /api proxy configured in vite.config.ts

const API_BASE = '/api';

export async function fetchGlobal(slug: string) {
    try {
        const res = await fetch(`${API_BASE}/globals/${slug}?depth=1`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch global ${slug}: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error(`Error fetching global ${slug}:`, error);
        return null;
    }
}

export async function fetchCollection(slug: string, query: Record<string, string> = {}) {
    try {
        const searchParams = new URLSearchParams({ depth: '1', ...query });
        const res = await fetch(`${API_BASE}/${slug}?${searchParams.toString()}`);
        if (!res.ok) throw new Error(`Failed to fetch collection ${slug}: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error(`Error fetching collection ${slug}:`, error);
        return { docs: [], totalDocs: 0 };
    }
}

export function getImageUrl(media: any) {
    if (!media) return '';
    if (typeof media === 'string') return media; // Handle URL strings if simple backend
    if (media.url) {
        // If the URL is already absolute (e.g. from Cloudinary/S3), return it
        if (media.url.startsWith('http')) return media.url;
        // Otherwise assume it's relative from Payload local server
        return `http://localhost:3001${media.url}`;
    }
    return '';
}
