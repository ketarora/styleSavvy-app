"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Cloud, ArrowLeft, Sun, CloudRain, MapPin, Search, Star, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const weatherData = {
  Mumbai: { temp: 28, condition: "Sunny", humidity: 65, windSpeed: 12, icon: Sun },
  Delhi: { temp: 22, condition: "Cloudy", humidity: 45, windSpeed: 8, icon: Cloud },
  Bangalore: { temp: 24, condition: "Rainy", humidity: 80, windSpeed: 15, icon: CloudRain },
  Chennai: { temp: 30, condition: "Hot", humidity: 70, windSpeed: 10, icon: Sun },
  Kolkata: { temp: 26, condition: "Humid", humidity: 85, windSpeed: 6, icon: Cloud },
}

const outfitsByWeather = {
  Sunny: [
    {
      name: "Light Cotton Kurta",
      price: 1299,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop&crop=center",
      features: ["UV Protection", "Breathable", "Light Colors"],
      rating: 4.5,
      temp: "25-35°C",
    },
    {
      name: "Linen Palazzo Set",
      price: 1899,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=300&fit=crop&crop=center",
      features: ["Moisture Wicking", "Loose Fit", "Natural Fabric"],
      rating: 4.3,
      temp: "25-35°C",
    },
  ],
  Cloudy: [
    {
      name: "Light Cardigan Set",
      price: 2299,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=300&fit=crop&crop=center",
      features: ["Layerable", "Comfortable", "Versatile"],
      rating: 4.4,
      temp: "20-28°C",
    },
    {
      name: "Cotton Blend Dress",
      price: 1799,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=300&fit=crop&crop=center",
      features: ["All-day Comfort", "Easy Care", "Stylish"],
      rating: 4.2,
      temp: "20-28°C",
    },
  ],
  Rainy: [
    {
      name: "Waterproof Jacket",
      price: 3999,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=300&fit=crop&crop=center",
      features: ["Waterproof", "Quick Dry", "Packable"],
      rating: 4.7,
      temp: "18-25°C",
    },
    {
      name: "Rain-Ready Outfit",
      price: 2499,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop&crop=center",
      features: ["Water Resistant", "Dark Colors", "Practical"],
      rating: 4.1,
      temp: "18-25°C",
    },
  ],
}

export default function WeatherOutfitsPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [searchCity, setSearchCity] = useState("")
  const [currentWeather, setCurrentWeather] = useState(weatherData.Mumbai)

  useEffect(() => {
    setCurrentWeather(weatherData[selectedCity as keyof typeof weatherData])
  }, [selectedCity])

  const getWeatherCategory = (condition: string) => {
    if (condition.includes("Rain")) return "Rainy"
    if (condition.includes("Cloud")) return "Cloudy"
    return "Sunny"
  }

  const weatherCategory = getWeatherCategory(currentWeather.condition)
  const outfits = outfitsByWeather[weatherCategory as keyof typeof outfitsByWeather] || outfitsByWeather.Sunny

  const WeatherIcon = currentWeather.icon

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
              <Cloud className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Weather-Aware Outfits</h1>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <WeatherIcon className="w-4 h-4 mr-1" />
              Live Weather
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weather Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Current Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* City Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search city..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* City Selection */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {Object.keys(weatherData).map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        selectedCity === city
                          ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                {/* Weather Display */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <WeatherIcon className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">{selectedCity}</h3>
                  <p className="text-4xl font-bold text-blue-600 my-2">{currentWeather.temp}°C</p>
                  <p className="text-gray-600 mb-4">{currentWeather.condition}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Humidity</p>
                      <p className="font-semibold">{currentWeather.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Wind</p>
                      <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Weather Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {weatherCategory === "Sunny" && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Sunny Weather</h4>
                      <ul className="text-yellow-700 mt-1 space-y-1">
                        <li>• Choose light, breathable fabrics</li>
                        <li>• Opt for light colors to reflect heat</li>
                        <li>• Don't forget sun protection</li>
                        <li>• Stay hydrated</li>
                      </ul>
                    </div>
                  )}

                  {weatherCategory === "Cloudy" && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Cloudy Weather</h4>
                      <ul className="text-gray-700 mt-1 space-y-1">
                        <li>• Layer for temperature changes</li>
                        <li>• Choose versatile pieces</li>
                        <li>• Comfortable fabrics work best</li>
                        <li>• Keep a light jacket handy</li>
                      </ul>
                    </div>
                  )}

                  {weatherCategory === "Rainy" && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Rainy Weather</h4>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• Waterproof or water-resistant fabrics</li>
                        <li>• Dark colors hide stains better</li>
                        <li>• Quick-dry materials are ideal</li>
                        <li>• Don't forget waterproof footwear</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outfit Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WeatherIcon className="w-5 h-5 text-blue-600" />
                  Perfect for {currentWeather.condition} Weather
                </CardTitle>
                <CardDescription>
                  Outfit recommendations for {currentWeather.temp}°C in {selectedCity}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {outfits.map((outfit, index) => (
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
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-white">{outfit.temp}</Badge>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">{outfit.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{outfit.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {outfit.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
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
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
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

                {/* Weather Forecast */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-lg mb-4">3-Day Weather Forecast</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="font-medium">Tomorrow</p>
                      <Sun className="w-8 h-8 mx-auto my-2 text-yellow-500" />
                      <p className="text-lg font-bold">29°C</p>
                      <p className="text-sm text-gray-600">Sunny</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="font-medium">Day 2</p>
                      <Cloud className="w-8 h-8 mx-auto my-2 text-gray-500" />
                      <p className="text-lg font-bold">26°C</p>
                      <p className="text-sm text-gray-600">Cloudy</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="font-medium">Day 3</p>
                      <CloudRain className="w-8 h-8 mx-auto my-2 text-blue-500" />
                      <p className="text-lg font-bold">23°C</p>
                      <p className="text-sm text-gray-600">Rainy</p>
                    </div>
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
