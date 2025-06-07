"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Share2, Copy, Edit3, ArrowLeft, Heart, ShoppingCart, LinkIcon, Check, Users, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const sampleOutfits = [
  {
    id: 1,
    name: "Festive Ethnic Look",
    description: "Perfect for Diwali celebrations",
    items: [
      { name: "Silk Saree", price: 4999, image: "/placeholder.svg?height=150&width=100" },
      { name: "Gold Jewelry Set", price: 2999, image: "/placeholder.svg?height=150&width=100" },
      { name: "Ethnic Footwear", price: 1299, image: "/placeholder.svg?height=150&width=100" },
    ],
    totalPrice: 9297,
    originalPrice: 12999,
    tags: ["Festive", "Traditional", "Elegant"],
    views: 234,
    likes: 45,
  },
  {
    id: 2,
    name: "Casual Weekend Vibes",
    description: "Comfortable yet stylish for weekend outings",
    items: [
      { name: "Cotton Kurta", price: 1299, image: "/placeholder.svg?height=150&width=100" },
      { name: "Palazzo Pants", price: 899, image: "/placeholder.svg?height=150&width=100" },
      { name: "Casual Sandals", price: 799, image: "/placeholder.svg?height=150&width=100" },
    ],
    totalPrice: 2997,
    originalPrice: 4199,
    tags: ["Casual", "Comfortable", "Weekend"],
    views: 156,
    likes: 28,
  },
]

export default function SharePage() {
  const [selectedOutfit, setSelectedOutfit] = useState(sampleOutfits[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editedOutfit, setEditedOutfit] = useState(selectedOutfit)
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)

  const generateShareLink = () => {
    const baseUrl = "https://stylesavvy.app/shared/"
    const outfitId = Math.random().toString(36).substr(2, 9)
    const link = `${baseUrl}${outfitId}?outfit=${encodeURIComponent(JSON.stringify(editedOutfit))}`
    setShareLink(link)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const saveChanges = () => {
    setSelectedOutfit(editedOutfit)
    setIsEditing(false)
    generateShareLink()
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
              <h1 className="text-2xl font-bold text-gray-800">Shareable Style Links</h1>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              <Share2 className="w-4 h-4 mr-1" />
              Social Shopping
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Outfit Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Popular Outfits
                </CardTitle>
                <CardDescription>Choose an outfit to customize and share</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleOutfits.map((outfit) => (
                    <div
                      key={outfit.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedOutfit.id === outfit.id ? "bg-orange-50 border-orange-200" : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setSelectedOutfit(outfit)
                        setEditedOutfit(outfit)
                        setIsEditing(false)
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{outfit.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Eye className="w-3 h-3" />
                            {outfit.views}
                            <Heart className="w-3 h-3" />
                            {outfit.likes}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">{outfit.description}</p>

                        <div className="flex gap-1">
                          {outfit.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-green-600">
                              ₹{outfit.totalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{outfit.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round(((outfit.originalPrice - outfit.totalPrice) / outfit.originalPrice) * 100)}% off
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outfit Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {isEditing ? <Edit3 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                      {isEditing ? "Edit Outfit" : "Share Your Style"}
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? "Customize the outfit details and items" : "Create a shareable link for this outfit"}
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => {
                      if (isEditing) {
                        saveChanges()
                      } else {
                        setIsEditing(true)
                      }
                    }}
                  >
                    {isEditing ? "Save Changes" : "Edit Outfit"}
                    <Edit3 className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Outfit Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Outfit Name</label>
                      {isEditing ? (
                        <Input
                          value={editedOutfit.name}
                          onChange={(e) => setEditedOutfit({ ...editedOutfit, name: e.target.value })}
                          placeholder="Enter outfit name"
                        />
                      ) : (
                        <h3 className="text-xl font-semibold">{selectedOutfit.name}</h3>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      {isEditing ? (
                        <Textarea
                          value={editedOutfit.description}
                          onChange={(e) => setEditedOutfit({ ...editedOutfit, description: e.target.value })}
                          placeholder="Describe this outfit"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-600">{selectedOutfit.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Outfit Items */}
                  <div>
                    <h4 className="font-semibold mb-4">Outfit Items</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {(isEditing ? editedOutfit : selectedOutfit).items.map((item, index) => (
                        <Card key={index} className="p-4">
                          <div className="text-center space-y-2">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={120}
                              className="mx-auto rounded-md object-cover"
                            />
                            <h5 className="font-medium text-sm">{item.name}</h5>
                            <p className="text-green-600 font-semibold">₹{item.price.toLocaleString("en-IN")}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold">Total: </span>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{(isEditing ? editedOutfit : selectedOutfit).totalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          ₹{(isEditing ? editedOutfit : selectedOutfit).originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Save ₹
                        {(
                          (isEditing ? editedOutfit : selectedOutfit).originalPrice -
                          (isEditing ? editedOutfit : selectedOutfit).totalPrice
                        ).toLocaleString("en-IN")}
                      </Badge>
                    </div>
                  </div>

                  {/* Share Link Section */}
                  {!isEditing && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button onClick={generateShareLink} className="bg-orange-600 hover:bg-orange-700">
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Generate Share Link
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          Anyone with link can view and edit
                        </div>
                      </div>

                      {shareLink && (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input value={shareLink} readOnly className="flex-1" />
                            <Button
                              variant="outline"
                              onClick={copyToClipboard}
                              className={copied ? "bg-green-50 border-green-200" : ""}
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>

                          {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Share Features:</h5>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Recipients can view the complete outfit</li>
                              <li>• They can edit outfit name and description</li>
                              <li>• Real-time price updates from multiple stores</li>
                              <li>• Direct purchase links for each item</li>
                              <li>• Virtual try-on integration</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Complete Outfit
                    </Button>
                    <Button variant="outline">
                      <Heart className="w-4 h-4 mr-2" />
                      Save to Wishlist
                    </Button>
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
