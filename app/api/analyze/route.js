import { NextResponse } from 'next/server';
import { fetchSocialData } from '@/lib/socialFetch';
import { analyzeSentiment } from '@/lib/sentimentAI';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ results: undefined, error: 'No keyword provided' }, { status: 400 });
  }

  const rawPosts = await fetchSocialData(keyword);         // Ambil dari Twitter/dll
  const sentimentResults = await analyzeSentiment(rawPosts); // Analisa sentimen

  return NextResponse.json({ keyword, results: sentimentResults });
}
