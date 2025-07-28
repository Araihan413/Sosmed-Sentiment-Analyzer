import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  // title: "SentimentAI - AI-Powered Social Media Sentiment Analysis",
  title: "MoodScan - AI-Powered Social Media Sentiment Analysis",
  description:
    "Analyze social media comments in real-time to measure brand reputation, customer satisfaction, and trends with our AI-powered sentiment analysis tool.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased `}>{children}
      </body>
    </html>

  )
}
