"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ShoppingBag,
  MessageCircle,
  Heart,
  Cloud,
  Camera,
  Bell,
  Search,
  TrendingUp,
  Calendar,
  Star,
  Plus,
  ArrowRight,
  LogOut,
  LucideUser,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { supabase, type User, type UserOutfit, type UserAnalytics } from "@/lib/supabase"

const weatherData = {
  Mumbai: { temp: 28, condition: "Sunny", humidity: 65 },
  Delhi: { temp: 22, condition: "Cloudy", humidity: 45 },
  Bangalore: { temp: 24, condition: "Rainy", humidity: 80 },
  Chennai: { temp: 30, condition: "Hot", humidity: 70 },
  Kolkata: { temp: 26, condition: "Humid", humidity: 85 },
}

const moodBasedRecommendations = {
  Happy: [
    {
      name: "Bright Yellow Kurta",
      price: 1899,
      originalPrice: 2999,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.6,
      match: 95,
    },
    {
      name: "Colorful Palazzo Set",
      price: 2299,
      originalPrice: 3499,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.4,
      match: 88,
    },
  ],
  Confident: [
    {
      name: "Power Red Blazer",
      price: 4999,
      originalPrice: 7999,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.8,
      match: 96,
    },
    {
      name: "Statement Saree",
      price: 6999,
      originalPrice: 9999,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.7,
      match: 92,
    },
  ],
  Professional: [
    {
      name: "Classic Blazer Set",
      price: 5999,
      originalPrice: 8999,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.9,
      match: 98,
    },
    {
      name: "Formal Shirt Combo",
      price: 3299,
      originalPrice: 4999,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.6,
      match: 94,
    },
  ],
  Relaxed: [
    {
      name: "Comfy Cotton Set",
      price: 1299,
      originalPrice: 1999,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.3,
      match: 90,
    },
    {
      name: "Soft Palazzo Combo",
      price: 1799,
      originalPrice: 2799,
      image: "/placeholder.svg?height=200&width=150",
      rating: 4.5,
      match: 87,
    },
  ],
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userOutfits, setUserOutfits] = useState<UserOutfit[]>([])
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null)
  const [currentWeather, setCurrentWeather] = useState(weatherData.Mumbai)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get user from localStorage
        const storedUser = localStorage.getItem("stylesavvy_user")
        if (!storedUser) {
          router.push("/login")
          return
        }

        const userData = JSON.parse(storedUser)
        setUser(userData)

        // Set weather based on user location
        if (userData.location && weatherData[userData.location as keyof typeof weatherData]) {
          setCurrentWeather(weatherData[userData.location as keyof typeof weatherData])
        }

        // Fetch user outfits
        const { data: outfits } = await supabase
          .from("user_outfits")
          .select("*")
          .eq("user_id", userData.id)
          .order("created_at", { ascending: false })
          .limit(4)

        if (outfits) {
          setUserOutfits(outfits)
        }

        // Fetch user analytics
        const { data: analytics } = await supabase
          .from("user_analytics")
          .select("*")
          .eq("user_id", userData.id)
          .single()

        if (analytics) {
          setUserAnalytics(analytics)
        }
      } catch (error) {
        console.error("Error loading user data:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("stylesavvy_user")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const recommendations =
    moodBasedRecommendations[user.current_mood as keyof typeof moodBasedRecommendations] ||
    moodBasedRecommendations.Happy

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
                <span className="text-xl font-bold text-gray-800">StyleSavvy</span>
              </Link>
              <div className="hidden md:flex items-center gap-6 ml-8">
                <Link href="/ai-chat" className="text-gray-600 hover:text-purple-600">
                  AI Chat
                </Link>
                <Link href="/emotion-styling" className="text-gray-600 hover:text-purple-600">
                  Mood Styling
                </Link>
                <Link href="/weather-outfits" className="text-gray-600 hover:text-purple-600">
                  Weather
                </Link>
                <Link href="/compare" className="text-gray-600 hover:text-purple-600">
                  Compare
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600">
            Ready to discover your perfect {user.style_preference?.toLowerCase()} style for {user.location}?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saved Outfits</p>
                  <p className="text-2xl font-bold">{userAnalytics?.total_outfits_created || 0}</p>
                </div>
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Money Saved</p>
                  <p className="text-2xl font-bold">
                    ₹{userAnalytics?.total_money_saved?.toLocaleString("en-IN") || "0"}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Mood</p>
                  <p className="text-2xl font-bold">{user.current_mood}</p>
                </div>
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Weather in {user.location}</p>
                  <p className="text-2xl font-bold">{currentWeather.temp}°C</p>
                </div>
                <Cloud className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Your Personalized Recommendations
                </CardTitle>
                <CardDescription>
                  Based on your {user.current_mood?.toLowerCase()} mood, {user.style_preference?.toLowerCase()} style,
                  and {currentWeather.condition.toLowerCase()} weather in {user.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={120}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{item.rating}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {item.match}% match
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <span className="font-bold text-green-600">₹{item.price.toLocaleString("en-IN")}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <Button size="sm" className="mt-2 w-full">
                            Try On
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Outfits */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Recent Outfits</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {userOutfits.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {userOutfits.map((outfit) => (
                      <Card key={outfit.id} className="p-4">
                        <div className="flex gap-3">
                          <Image
                            src={outfit.image_url || "/placeholder.svg"}
                            alt={outfit.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{outfit.name}</h4>
                            <p className="text-sm text-gray-600">{outfit.items?.length || 0} items</p>
                            <div className="flex gap-2 mt-2">
                              {outfit.mood && (
                                <Badge variant="secondary" className="text-xs">
                                  {outfit.mood}
                                </Badge>
                              )}
                              {outfit.weather && (
                                <Badge variant="secondary" className="text-xs">
                                  {outfit.weather}
                                </Badge>
                              )}
                            </div>
                            <p className="font-bold text-green-600 mt-2">
                              ₹{outfit.total_price.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No outfits yet</h3>
                    <p className="text-gray-500 mb-4">Start creating your perfect outfits!</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Outfit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideUser className="w-5 h-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium">{user.style_preference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">₹{user.budget_range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{user.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Favorite Category:</span>
                    <span className="font-medium">{userAnalytics?.most_shopped_category || "Getting Started"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/ai-chat">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with AI Stylist
                  </Button>
                </Link>
                <Link href="/emotion-styling">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Update Mood
                  </Button>
                </Link>
                <Link href="/weather-outfits">
                  <Button variant="outline" className="w-full justify-start">
                    <Cloud className="w-4 h-4 mr-2" />
                    Weather Outfits
                  </Button>
                </Link>
                <Link href="/virtual-try-on">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Virtual Try-On
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Today's Weather */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Weather in {user.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{currentWeather.temp}°C</p>
                  <p className="text-gray-600">{currentWeather.condition}</p>
                  <p className="text-sm text-gray-500">Humidity: {currentWeather.humidity}%</p>
                  <Link href="/weather-outfits">
                    <Button className="mt-4 w-full">
                      Get Weather Outfits
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Style Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Style Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                    <span className="text-sm">Tomorrow - Office Meeting</span>
                    <Badge variant="secondary">Professional</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-pink-50 rounded">
                    <span className="text-sm">Friday - Date Night</span>
                    <Badge variant="secondary">Elegant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm">Weekend - Brunch</span>
                    <Badge variant="secondary">Casual</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
