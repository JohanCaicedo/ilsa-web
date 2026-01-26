import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Get the cache directory path
const CACHE_DIR = path.join(process.cwd(), '.cache', 'wp');

// Ensure cache directory exists
function ensureCacheDir() {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
}

/**
 * Reads data from the file system cache
 */
export function readCache<T>(query: string, variables: any): T | null {
    try {
        ensureCacheDir();
        const hash = crypto.createHash('md5')
            .update(query + JSON.stringify(variables || {}))
            .digest('hex');

        const cachePath = path.join(CACHE_DIR, `${hash}.json`);

        if (fs.existsSync(cachePath)) {
            const raw = fs.readFileSync(cachePath, 'utf-8');
            return JSON.parse(raw);
        }
    } catch (e) {
        console.warn('Failed to read from cache:', e);
    }
    return null;
}

/**
 * Writes data to the file system cache
 */
export function writeCache<T>(query: string, variables: any, data: T): void {
    try {
        ensureCacheDir();
        const hash = crypto.createHash('md5')
            .update(query + JSON.stringify(variables || {}))
            .digest('hex');

        const cachePath = path.join(CACHE_DIR, `${hash}.json`);
        fs.writeFileSync(cachePath, JSON.stringify(data), 'utf-8');
    } catch (e) {
        console.warn('Failed to write to cache:', e);
    }
}
