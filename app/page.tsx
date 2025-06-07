"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Heart,
  Cloud,
  BarChart3,
  Camera,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-8 h-8 text-white" />
          <span className="text-white font-bold text-xl">StyleSavvy</span>
        </div>
        <div className="flex gap-2">
          <Link href="/login">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-purple-600 hover:bg-white/90">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <div className="mb-6">
          <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">AI Smart Shopping Assistant</h1>

        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Your Mood. Your Calendar. Your Style — All in One AI.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            Emotion-Based Styling
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Cloud className="w-4 h-4 mr-2" />
            Weather-Aware
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Smart Price Tracking
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Camera className="w-4 h-4 mr-2" />
            Virtual Try-On
          </Badge>
        </div>

        <Link href="/dashboard">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-white/95 backdrop-blur-sm py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience the Future of Fashion</h2>
            <p className="text-gray-600 text-lg">Click on any feature below to see our AI in action</p>
          </div>

          {/* Optimized Grid Layout for 5 Cards in W-Shape with Original Width */}
          <div className="max-w-5xl mx-auto">
            {/* Top Row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* AI Stylist Chat */}
              <Link href="/ai-chat">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">AI Stylist Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4">
                      Talk to your personal AI fashion assistant
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Quick Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Emotion-Based Styling */}
              <Link href="/emotion-styling">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Emotion-Based Styling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4">
                      Style suggestions based on your current mood
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Quick Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Weather-Aware Outfits */}
              <Link href="/weather-outfits">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <Cloud className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Weather-Aware Outfits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4">
                      Perfect outfits for any weather condition
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Quick Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Bottom Row: 2 cards centered to align with gaps above */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto lg:px-16">
              {/* Smart Price Comparison */}
              <Link href="/compare">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Smart Price Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4">
                      Find the best deals across all platforms
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Quick Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Shareable Links */}
              <Link href="/share">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <Share2 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Shareable Style Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4">
                      Create and share editable outfit links with friends
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Quick Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Virtual Try-On Experience Section - The only remaining virtual try-on block */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-none">
              <CardHeader className="text-center">
                <Camera className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Virtual Try-On Experience</CardTitle>
                <CardDescription className="text-lg">
                  See how clothes look on you before buying - now with Indian pricing!
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop&crop=center"
                        alt="Casual Kurta"
                        className="w-24 h-32 object-cover rounded-lg mx-auto mb-3"
                      />
                    </div>
                    <h4 className="font-semibold mb-2">Casual Kurta</h4>
                    <p className="text-2xl font-bold text-green-600">₹1,299</p>
                    <p className="text-sm text-gray-500">Was ₹1,899</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&h=200&fit=crop&crop=center"
                        alt="Designer Saree"
                        className="w-24 h-32 object-cover rounded-lg mx-auto mb-3"
                      />
                    </div>
                    <h4 className="font-semibold mb-2">Designer Saree</h4>
                    <p className="text-2xl font-bold text-green-600">₹4,999</p>
                    <p className="text-sm text-gray-500">Was ₹7,499</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=200&fit=crop&crop=center"
                        alt="Formal Shirt"
                        className="w-24 h-32 object-cover rounded-lg mx-auto mb-3"
                      />
                    </div>
                    <h4 className="font-semibold mb-2">Formal Shirt</h4>
                    <p className="text-2xl font-bold text-green-600">₹899</p>
                    <p className="text-sm text-gray-500">Was ₹1,299</p>
                  </div>
                </div>
                <Link href="/virtual-try-on">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Try Virtual Fitting Room
                    <Camera className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
