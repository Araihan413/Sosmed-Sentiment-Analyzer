# YouTube Sentiment Analyzer 🎭📊

An AI-powered tool to analyze sentiment and extract insights from YouTube comments in multiple languages — including Indonesian slang like *"Mantul"* or *"Gaje"*.

[![Live Demo](https://img.shields.io/badge/Demo-Online-green)](https://your-demo.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-blue)](https://nextjs.org)
[![AI Model](https://img.shields.io/badge/IBM_Granite-3.3B-orange)](https://replicate.com/ibm/granite-3b-instruct)

![App Screenshot](public/screenshot.png)

---

## ✨ Features

- ✅ **Multilingual Sentiment Analysis**  
  Understand comments in Indonesian (with slang support), English, or mixed.

- ✅ **Automatic Sentiment Classification**  
  Categorize comments as **Positive**, **Neutral**, or **Negative**.

- ✅ **Keyword Extraction**  
  Identify dominant phrases like _“packaging rusak”_ or _“pengiriman cepat”_.

- ✅ **Interactive Dashboard**  
  Visualize insights with pie/bar charts and word clouds.

- ✅ **Analysis History (Optional)**  
  Save and manage analysis history via Firebase.

---

## 🧠 How It Works

### 1. Sentiment Classification

| Label      | Contoh Komentar                            |
|------------|---------------------------------------------|
| ✅ Positive | "Keren banget!", "Gaskeun", 😊❤️            |
| 🟢 Neutral  | "Saya beli di Shopee", "Bagus sih..."       |
| ❌ Negative | "Gak worth it", "Ripuh", 😠👎                |

### 2. Slang & Emoji Recognition  
Supports informal/slang terms and emoji sentiment mapping.

### 3. Output Format (Example)

```json
{
  "positive": 65,
  "neutral": 20,
  "negative": 15,
  "keywords": {
    "positive": ["bagus", "cepat"],
    "negative": ["lama", "mahal"]
  },
  "rawComments": [
    { "text": "Produknya bagus!", "sentiment": "positive" },
    { "text": "Pengirimannya lama", "sentiment": "negative" }
  ]
}
```

---

## 🚀 How to Use

### 1. Analyze YouTube Video Comments
- Paste a YouTube video URL (e.g., `https://youtu.be/xyz123`)
- Click **"Analisis Sekarang"**
- See:
  - Sentiment percentage
  - Keyword insights
  - Raw comment breakdown

### 2. Analyze Manual Text
- Paste a sentence (e.g., `"Produknya bagus, tapi pengirimannya lama banget!"`)
- Click **"Analisis Sekarang"**
- See instant results

### 3. Save & Export (Optional)
- Login with Google to store analysis history
- Download PDF reports

---

## 🛠️ Tech Stack

| Komponen     | Teknologi         | Alasan                            |
|--------------|-------------------|-----------------------------------|
| Frontend     | Next.js 14        | SEO-friendly & fast rendering     |
| Styling      | Tailwind CSS      | Rapid UI development              |
| AI Model     | IBM Granite 3.3B  | Accurate with informal text       |
| Deployment   | Vercel            | Seamless with Next.js             |
| Database     | Firebase (optional)| Realtime storage for user history |

---

## ⚙️ Installation Guide

### Prerequisites
- Node.js 18+
- YouTube Data API v3 Key
- Replicate API Key

### Steps

```bash
# Clone the repo
git clone https://github.com/your-repo/youtube-sentiment-analyzer.git
cd youtube-sentiment-analyzer

# Install dependencies
npm install

# Create .env.local file
touch .env.local
```

Inside `.env.local`, add:

```env
YOUTUBE_API_KEY=your_youtube_api_key
REPLICATE_API_KEY=your_replicate_api_key
```

Then start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📊 Real-World Example

**Case**: A YouTuber posts a gadget review and receives 500+ comments.  
**Problem**: They don’t realize many viewers are complaining about **battery life**.  
**Solution**:  
- Analyze the video with this tool  
- Find that 25% of comments mention **“baterai cepat habis”**  
- Address the issue in future content

---

## 📜 License

MIT © 2024 [Your Name]

---

## 🎯 Next Features (Planned)

- 📈 Compare sentiment across multiple videos
- 🔔 Alert when negative sentiment spikes
- 📂 CSV/PDF export enhancements

---

> 💡 Save time and make smarter decisions by understanding your audience’s voice — powered by AI.
