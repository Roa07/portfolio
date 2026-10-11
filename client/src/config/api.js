const rawApiUrl = import.meta.env.VITE_API_URL || '';
// Strip trailing slash if present
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');
