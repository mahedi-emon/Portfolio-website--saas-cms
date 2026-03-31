/**
 * HTML Sanitization Utility
 * 
 * Provides safe HTML rendering for user-generated content.
 * Uses DOMPurify for production-grade XSS protection.
 * 
 * USAGE:
 *   import { sanitizeHtml, stripHtml } from '../utils/sanitizeHtml';
 *   
 *   // For rendering HTML safely:
 *   <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
 *   
 *   // For plain text extraction:
 *   <p>{stripHtml(content)}</p>
 */

import DOMPurify from 'dompurify';

// ============================================================================
// Configuration
// ============================================================================

/**
 * Allowed HTML tags for sanitized content.
 * Restrictive by default - add more as needed for your use case.
 */
const ALLOWED_TAGS = [
  // Text formatting
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'small', 'sub', 'sup',
  // Headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Lists
  'ul', 'ol', 'li',
  // Links (with restrictions)
  'a',
  // Code
  'code', 'pre', 'kbd',
  // Quotes
  'blockquote', 'q', 'cite',
  // Horizontal rule
  'hr',
  // Spans for styling
  'span', 'div',
];

/**
 * Allowed attributes for sanitized content.
 */
const ALLOWED_ATTRS = [
  'href', 'target', 'rel', 'class', 'id',
  'title', 'alt', 'aria-label', 'aria-hidden',
];

/**
 * Allowed URL protocols for links.
 */
const ALLOWED_PROTOCOLS = ['http', 'https', 'mailto', 'tel'];

// ============================================================================
// Sanitization Functions
// ============================================================================

/**
 * Sanitize HTML content for safe rendering.
 * Uses DOMPurify for production-grade XSS protection.
 * 
 * @param html - Raw HTML string from CMS/database
 * @returns Sanitized HTML safe for dangerouslySetInnerHTML
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  
  // Trim whitespace
  const trimmed = html.trim();
  if (!trimmed) return '';

  // SSR fallback - strip all HTML when document is not available
  if (typeof window === 'undefined') {
    return stripHtml(trimmed);
  }
  
  // Use DOMPurify for production-grade sanitization
  return DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ALLOWED_ATTRS,
    ALLOWED_URI_REGEXP: new RegExp(`^(?:${ALLOWED_PROTOCOLS.join('|')}):`, 'i'),
    KEEP_CONTENT: true,
  });
}



/**
 * Strip all HTML tags and return plain text.
 * Useful for excerpts, meta descriptions, and plain text displays.
 * 
 * @param html - HTML string
 * @returns Plain text with HTML tags removed
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  
  // SSR-safe implementation
  if (typeof document === 'undefined') {
    // Basic regex fallback for SSR
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace nbsp
      .replace(/&amp;/g, '&')  // Replace ampersand
      .replace(/&lt;/g, '<')   // Replace less than
      .replace(/&gt;/g, '>')   // Replace greater than
      .replace(/&quot;/g, '"') // Replace quotes
      .replace(/&#39;/g, "'")  // Replace apostrophe
      .replace(/\s+/g, ' ')    // Normalize whitespace
      .trim();
  }
  
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return (temp.textContent || temp.innerText || '').trim();
}

/**
 * Truncate HTML content safely.
 * Strips HTML, truncates, and adds ellipsis.
 * 
 * @param html - HTML string
 * @param maxLength - Maximum character length
 * @returns Truncated plain text
 */
export function truncateHtml(html: string | null | undefined, maxLength: number): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  
  // Find last space before maxLength to avoid cutting words
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace).trim() + '...';
  }
  
  return truncated.trim() + '...';
}

/**
 * Check if a string contains HTML tags.
 * 
 * @param str - String to check
 * @returns true if string contains HTML
 */
export function containsHtml(str: string | null | undefined): boolean {
  if (!str) return false;
  return /<[a-z][\s\S]*>/i.test(str);
}

// ============================================================================
// Export configuration for external use
// ============================================================================

export const SANITIZE_CONFIG = {
  ALLOWED_TAGS,
  ALLOWED_ATTRS,
  ALLOWED_PROTOCOLS,
} as const;
