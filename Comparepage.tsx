"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, ShoppingCart, Heart, ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Cotton Kurta Set",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop&crop=center",
    prices: [
      { platform: "Myntra", price: 1299, originalPrice: 1899, rating: 4.2, reviews: 1250 },
      { platform: "Ajio", price: 1199, originalPrice: 1799, rating: 4.0, reviews: 890 },
      { platform: "Flipkart", price: 1399, originalPrice: 1999, rating: 4.3, reviews: 2100 },
      { platform: "Amazon", price: 1249, originalPrice: 1849, rating: 4.1, reviews: 1680 },
    ],
  },
  {
    id: 2,
    name: "Designer Saree",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop&crop=center",
    prices: [
      { platform: "Nykaa Fashion", price: 4999, originalPrice: 7499, rating: 4.5, reviews: 450 },
      { platform: "Myntra", price: 5299, originalPrice: 7999, rating: 4.3, reviews: 680 },
      { platform: "Ajio", price: 4799, originalPrice: 6999, rating: 4.4, reviews: 320 },
      { platform: "Flipkart", price: 5099, originalPrice: 7699, rating: 4.2, reviews: 890 },
    ],
  },
]

export default function ComparePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(products[0])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getBestPrice = (prices: any[]) => {
    return Math.min(...prices.map((p) => p.price))
  }

  const getBestDeal = (prices: any[]) => {
    return prices.reduce((best, current) => (current.price < best.price ? current : best))
  }

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
              <h1 className="text-2xl font-bold text-gray-800">Smart Price Comparison</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="w-4 h-4 mr-1" />
              Live Prices
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Search & List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search for clothing items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />

                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedProduct.id === product.id
                            ? "bg-purple-50 border-purple-200"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-green-600 font-semibold">
                              From ₹{getBestPrice(product.prices).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Comparison */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{selectedProduct.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Best Price: ₹{getBestPrice(selectedProduct.prices).toLocaleString("en-IN")}
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        Save up to ₹
                        {(
                          Math.max(...selectedProduct.prices.map((p) => p.originalPrice)) -
                          getBestPrice(selectedProduct.prices)
                        ).toLocaleString("en-IN")}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedProduct.prices
                    .sort((a, b) => a.price - b.price)
                    .map((priceData, index) => (
                      <Card
                        key={priceData.platform}
                        className={`${index === 0 ? "ring-2 ring-green-500 bg-green-50" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs font-semibold text-gray-600">
                                  {priceData.platform.slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{priceData.platform}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-600 ml-1">
                                      {priceData.rating} ({priceData.reviews.toLocaleString("en-IN")} reviews)
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-green-600">
                                  ₹{priceData.price.toLocaleString("en-IN")}
                                </span>
                                {index === 0 && <Badge className="bg-green-500 text-white">Best Price</Badge>}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{priceData.originalPrice.toLocaleString("en-IN")}
                                </span>
                                <span className="text-sm text-green-600 font-medium">
                                  {Math.round(
                                    ((priceData.originalPrice - priceData.price) / priceData.originalPrice) * 100,
                                  )}
                                  % off
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Buy Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
