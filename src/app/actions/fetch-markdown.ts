'use server';

/**
 * @fileOverview Server Action to fetch Markdown content from external sources.
 * Bypasses browser CORS restrictions and handles URL normalization for GitHub.
 */

/**
 * Normalizes a GitHub URL to its raw content equivalent.
 * e.g., converts github.com/.../blob/main/README.md to raw.githubusercontent.com/.../main/README.md
 */
function normalizeUrl(url: string): string {
  let normalized = url.trim();
  if (normalized.includes('github.com') && normalized.includes('/blob/')) {
    normalized = normalized
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
  }
  return normalized;
}

/**
 * Fetches Markdown text from a remote URL server-side.
 * @param url The external URL to fetch.
 * @returns The Markdown content as a string.
 * @throws Error if the fetch fails or the response is invalid.
 */
export async function fetchRemoteMarkdown(url: string): Promise<string> {
  const targetUrl = normalizeUrl(url);
  
  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      next: { revalidate: 3600 }, // Cache for 1 hour for high-fidelity performance
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch asset from ${targetUrl} (Status: ${response.status})`);
    }

    const text = await response.text();
    
    // Safety check: Ensure we didn't just fetch an HTML page (common with non-raw GitHub links)
    if (text.trim().toLowerCase().startsWith('<!doctype html')) {
      throw new Error("Target URL returned HTML instead of raw Markdown. Ensure you are using a 'Raw' link or a direct .md file URL.");
    }

    return text;
  } catch (error: any) {
    console.error('Markdown Fetch Error:', error);
    throw new Error(error.message || 'The external technical asset could not be reached. Verify the source URL integrity.');
  }
}
