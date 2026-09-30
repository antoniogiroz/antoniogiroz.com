import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { features } from '../config';

export type Post = CollectionEntry<'blog'>;

/** Drafts are visible in `astro dev` only. */
export async function getPosts(lang: Lang) {
  if (!features.blog) return [];
  const posts = await getCollection('blog', ({ data }) => data.lang === lang && (import.meta.env.DEV || !data.draft));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const postSlug = (post: Post) => post.id.split('/').pop() ?? post.id;

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}
