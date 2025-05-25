"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, ArrowLeft, Star, ShoppingCart, Heart, Zap, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const clothingItems = [
  {
    id: 1,
    name: "Elegant Silk Saree",
    price: 4999,
    originalPrice: 7499,
    brand: "Fabindia",
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=300&fit=crop&crop=center",
    colors: ["Red", "Blue", "Green", "Gold"],
  },
  {
    id: 2,
    name: "Cotton Kurta Set",
    price: 1299,
    originalPrice: 1899,
    brand: "W for Woman",
    rating: 4.2,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop&crop=center",
    colors: ["White", "Pink", "Yellow", "Mint"],
  },
]

export default function VirtualTryOnPage() {
  const [selectedItem, setSelectedItem] = useState(clothingItems[0])
  const [selectedColor, setSelectedColor] = useState(clothingItems[0].colors[0])
  const [isUploaded, setIsUploaded] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Virtual Try-On Studio</h1>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Virtual Try-On Area */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Virtual Fitting Room
                </CardTitle>
                <CardDescription>Upload your photo or use camera to see how clothes look on you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Upload/Camera Section */}
                  {!isUploaded ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Start Your Virtual Try-On</h3>
                      <p className="text-gray-500 mb-6">Upload a photo or take a new one to see how clothes fit</p>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={() => setIsUploaded(true)} className="bg-purple-600 hover:bg-purple-700">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <Button variant="outline" onClick={() => setIsUploaded(true)}>
                          <Camera className="w-4 h-4 mr-2" />
                          Use Camera
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8 text-center">
                        <div className="relative inline-block">
                          <Image
                            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop&crop=center"
                            alt="Virtual try-on preview"
                            width={300}
                            height={400}
                            className="rounded-lg shadow-lg"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-500 text-white">
                              <Zap className="w-3 h-3 mr-1" />
                              AI Fitted
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {selectedItem.name} in {selectedColor}
                          </h3>
                          <p className="text-gray-600">AI-powered fitting shows how this outfit looks on you</p>
                        </div>
                      </div>

                      {/* Color Selection */}
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Choose Color:</h4>
                        <div className="flex gap-2">
                          {selectedItem.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedColor === color
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-6">
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart - ₹{selectedItem.price.toLocaleString("en-IN")}
                        </Button>
                        <Button variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clothing Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Try These Items</CardTitle>
                <CardDescription>Select clothing items to virtually try on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clothingItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedItem.id === item.id ? "bg-purple-50 border-purple-200" : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setSelectedItem(item)
                        setSelectedColor(item.colors[0])
                      }}
                    >
                      <div className="flex gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-green-600">₹{item.price.toLocaleString("en-IN")}</span>
                            <span className="text-xs text-gray-500 line-through">
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
