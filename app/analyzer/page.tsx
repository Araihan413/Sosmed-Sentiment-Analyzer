"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  ArrowLeft,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  Clock,
} from "lucide-react"
import {extractYouTubeVideoId} from "@/lib/utils"
import { persentase } from "@/lib/utils"

import { encode } from "punycode"

interface SentimentResult {
  positive: number
  neutral: number
  negative: number
  keywords: {
    positive: string[]
    negative: string[]
  }
  rawComments: Array<{
    text: string
    sentiment: "positive" | "neutral" | "negative"
  }>
}

export default function AnalyzerPage() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<SentimentResult | null>(null)
  const [showRawData, setShowRawData] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    const videoId = extractYouTubeVideoId(inputText) || "";
// ? memanggil api untuk analisis data
    fetch(`/api/analyze?keyword=${encodeURIComponent(videoId)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setResults(data.results);
        setSearchHistory((prev) => [inputText, ...prev.slice(0, 4)]);
        setIsAnalyzing(false);
      })
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200"
      case "negative":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4" />
      case "negative":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Sentiment Analyzer</span>
            </div>
          </div>
          {results && (
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span>Download PDF Report</span>
            </Button>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Searches</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchHistory.length > 0 ? (
                  <div className="space-y-2">
                    {searchHistory.map((search, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setInputText(search)}
                      >
                        {search.length > 30 ? `${search.substring(0, 30)}...` : search}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No recent searches</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Analyze Sentiment</span>
                </CardTitle>
                <CardDescription>
                  Paste text or enter a hashtag to analyze sentiment from social media content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Try: 'Love this product, but delivery was slow.' or enter a hashtag like #YourBrand"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <>
                {/* Sentiment Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Sentiment Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-3xl">😊</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{persentase(results.positive, (results.positive + results.neutral + results.negative))}%</div>
                        <div className="text-gray-600">Positive</div>
                      </div>

                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-3xl">😐</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-600">{persentase(results.neutral, (results.positive + results.neutral + results.negative))}%</div>
                        <div className="text-gray-600">Neutral</div>
                      </div>

                      <div className="text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-3xl">😠</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600">{persentase(results.negative, (results.positive + results.neutral + results.negative))}%</div>
                        <div className="text-gray-600">Negative</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Keywords Cloud */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>Most frequently mentioned positive and negative keywords</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3 flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>Positive Keywords</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {results.keywords.positive.map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-700 border-green-200"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-red-600 mb-3 flex items-center space-x-2">
                          <TrendingDown className="h-4 w-4" />
                          <span>Negative Keywords</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {results.keywords.negative.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Raw Data Toggle */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Sample Detailed Analysis</CardTitle>
                        <CardDescription>View individual comments with sentiment labels</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="raw-data-toggle">Show Raw Data</Label>
                        <Switch id="raw-data-toggle" checked={showRawData} onCheckedChange={setShowRawData} />
                      </div>
                    </div>
                  </CardHeader>
                  {showRawData && (
                    <CardContent>
                      <div className="space-y-3">
                        {results.rawComments.map((comment, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div
                              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(comment.sentiment)}`}
                            >
                              {getSentimentIcon(comment.sentiment)}
                              <span className="capitalize">{comment.sentiment}</span>
                            </div>
                            <p className="text-gray-700 flex-1">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
