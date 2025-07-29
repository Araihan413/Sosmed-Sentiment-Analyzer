import {cleanHtmlTags} from "@/lib/utils"

export async function fetchSocialData(idVideo) {

  // Contoh dummy data, bisa diganti dengan fetch dari Twitter API
  const apiKey = process.env.YOUTUBE_API_KEY;
  const maxResults = 50;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${idVideo}&order=relevance&maxResults=${maxResults}&key=${apiKey}`
  )
  const data = await response.json();
  const results = data.items;
  const comments = results.map((result) => cleanHtmlTags(result.snippet.topLevelComment.snippet.textDisplay));
  return comments;

}
