"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Heart, ArrowLeft, Sparkles, ShoppingBag, Star, Palette } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const outfitSuggestions = {
  Happy: [
    {
      name: "Sunny Yellow Kurta",
      price: 1899,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop&crop=center",
      colors: ["Yellow", "Orange", "Coral"],
      mood: "Cheerful",
      rating: 4.6,
    },
    {
      name: "Bright Floral Dress",
      price: 2499,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=300&fit=crop&crop=center",
      colors: ["Multi", "Pink", "Yellow"],
      mood: "Joyful",
      rating: 4.4,
    },
  ],
  Confident: [
    {
      name: "Power Red Blazer",
      price: 4999,
      originalPrice: 7999,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop&crop=center",
      colors: ["Red", "Burgundy", "Black"],
      mood: "Powerful",
      rating: 4.8,
    },
    {
      name: "Bold Statement Saree",
      price: 6999,
      originalPrice: 9999,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=300&fit=crop&crop=center",
      colors: ["Red", "Gold", "Black"],
      mood: "Strong",
      rating: 4.7,
    },
  ],
  Relaxed: [
    {
      name: "Comfy Cotton Set",
      price: 1299,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop&crop=center",
      colors: ["Beige", "White", "Sage"],
      mood: "Chill",
      rating: 4.3,
    },
    {
      name: "Soft Palazzo Combo",
      price: 1799,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=300&fit=crop&crop=center",
      colors: ["Mint", "Cream", "Grey"],
      mood: "Calm",
      rating: 4.5,
    },
  ],
}

const emotions = [
  {
    name: "Happy",
    icon: "😊",
    description: "Feeling joyful and lighthearted",
  },
  {
    name: "Confident",
    icon: "😎",
    description: "Feeling empowered and self-assured",
  },
  {
    name: "Relaxed",
    icon: "😌",
    description: "Feeling calm and at peace",
  },
]

export default function EmotionStylingPage() {
  const [selectedEmotion, setSelectedEmotion] = useState("Happy")
  const [intensity, setIntensity] = useState([70])
  const [showResults, setShowResults] = useState(false)

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion)
    setShowResults(true)
  }

  const currentSuggestions =
    outfitSuggestions[selectedEmotion as keyof typeof outfitSuggestions] || outfitSuggestions.Happy

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-600" />
              <h1 className="text-2xl font-bold text-gray-800">Emotion-Based Styling</h1>
            </div>
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
              <Sparkles className="w-4 h-4 mr-1" />
              Mood Magic
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emotion Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  How are you feeling?
                </CardTitle>
                <CardDescription>Select your current mood to get personalized outfit suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.name}
                      onClick={() => handleEmotionSelect(emotion.name)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedEmotion === emotion.name
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{emotion.icon}</div>
                        <h3 className="font-semibold text-sm">{emotion.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{emotion.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedEmotion && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-3">
                      How strongly are you feeling {selectedEmotion.toLowerCase()}?
                    </label>
                    <Slider value={intensity} onValueChange={setIntensity} max={100} step={10} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Mild</span>
                      <span>Intense</span>
                    </div>
                    <p className="text-center mt-2 font-medium">{intensity[0]}%</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mood Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Styling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Happy Mood</h4>
                    <p className="text-yellow-700">Bright colors and playful patterns boost joy</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800">Confident Mood</h4>
                    <p className="text-red-700">Bold colors and structured silhouettes enhance power</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Relaxed Mood</h4>
                    <p className="text-green-700">Soft fabrics and neutral tones promote calm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outfit Suggestions */}
          <div className="lg:col-span-2">
            {showResults ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    Perfect for your {selectedEmotion} mood
                  </CardTitle>
                  <CardDescription>
                    Outfits curated to match your {selectedEmotion.toLowerCase()} feeling at {intensity[0]}% intensity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentSuggestions.map((outfit, index) => (
                      <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                        <div className="space-y-4">
                          <div className="relative">
                            <Image
                              src={outfit.image || "/placeholder.svg"}
                              alt={outfit.name}
                              width={200}
                              height={300}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <Badge className="absolute top-2 right-2 bg-pink-500 text-white">{outfit.mood}</Badge>
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg">{outfit.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{outfit.rating}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {outfit.colors.map((color) => (
                              <Badge key={color} variant="secondary" className="text-xs">
                                {color}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-green-600">
                                ₹{outfit.price.toLocaleString("en-IN")}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{outfit.originalPrice.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {Math.round(((outfit.originalPrice - outfit.price) / outfit.originalPrice) * 100)}% off
                            </Badge>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Buy Now
                            </Button>
                            <Link href="/virtual-try-on">
                              <Button variant="outline" className="flex-1">
                                Try On
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Mood Enhancement Tips */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">Enhance your {selectedEmotion} mood</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium">Colors</h5>
                        <p className="text-gray-600">
                          {selectedEmotion === "Happy" && "Bright yellows, oranges, and warm tones"}
                          {selectedEmotion === "Confident" && "Bold reds, deep blues, and strong blacks"}
                          {selectedEmotion === "Relaxed" && "Soft greens, calming blues, and neutral beiges"}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium">Fabrics</h5>
                        <p className="text-gray-600">
                          {selectedEmotion === "Happy" && "Light cottons, flowing chiffons, and playful prints"}
                          {selectedEmotion === "Confident" && "Structured blazers, crisp shirts, and tailored fits"}
                          {selectedEmotion === "Relaxed" && "Soft knits, comfortable cottons, and loose silhouettes"}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium">Accessories</h5>
                        <p className="text-gray-600">
                          {selectedEmotion === "Happy" && "Fun jewelry, colorful scarves, and playful bags"}
                          {selectedEmotion === "Confident" && "Statement pieces, bold watches, and structured bags"}
                          {selectedEmotion === "Relaxed" && "Minimal jewelry, soft scarves, and comfortable shoes"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Select your mood</h3>
                  <p className="text-gray-500">Choose how you're feeling to get personalized outfit recommendations</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
