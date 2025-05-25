"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, ArrowLeft, Sparkles, Heart, ShoppingBag, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const chatMessages = [
  {
    id: 1,
    type: "ai",
    message:
      "Hi! I'm your AI stylist assistant. I can help you find the perfect outfit based on your mood, weather, and occasion. What are you looking for today?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "user",
    message: "I have a job interview tomorrow and I'm feeling nervous. What should I wear?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    type: "ai",
    message:
      "Perfect! For a job interview, I recommend a confident and professional look. Since you're feeling nervous, let's choose something that makes you feel powerful and comfortable.",
    timestamp: "10:33 AM",
    suggestions: [
      {
        name: "Professional Blazer Set",
        price: 4999,
        image: "/placeholder.svg?height=150&width=100",
        confidence: 95,
      },
      {
        name: "Classic Shirt & Trousers",
        price: 3299,
        image: "/placeholder.svg?height=150&width=100",
        confidence: 88,
      },
    ],
  },
]

const quickSuggestions = [
  "I need a casual weekend outfit",
  "What should I wear for a date?",
  "Help me with office wear",
  "I'm feeling sad, cheer me up with colors",
  "It's raining, what should I wear?",
]

export default function AIChatPage() {
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai" as const,
        message:
          "Great question! Let me analyze your preferences and suggest some perfect outfits for you. Based on your style history and current trends, here are my recommendations:",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: [
          {
            name: "Trendy Casual Look",
            price: 2999,
            image: "/placeholder.svg?height=150&width=100",
            confidence: 92,
          },
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickSuggestion = (suggestion: string) => {
    setNewMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">AI Stylist Chat</h1>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">StyleSavvy AI</CardTitle>
                    <CardDescription>Your personal fashion assistant</CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.message}</p>
                        <p className={`text-xs mt-1 ${message.type === "user" ? "text-purple-200" : "text-gray-500"}`}>
                          {message.timestamp}
                        </p>
                      </div>

                      {/* AI Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Card key={index} className="p-3">
                              <div className="flex gap-3">
                                <Image
                                  src={suggestion.image || "/placeholder.svg"}
                                  alt={suggestion.name}
                                  width={60}
                                  height={90}
                                  className="rounded-md object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{suggestion.name}</h4>
                                  <p className="text-green-600 font-bold">
                                    ₹{suggestion.price.toLocaleString("en-IN")}
                                  </p>
                                  <Badge variant="secondary" className="mt-1 text-xs">
                                    {suggestion.confidence}% confidence
                                  </Badge>
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="text-xs">
                                      <ShoppingBag className="w-3 h-3 mr-1" />
                                      Buy
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Camera className="w-3 h-3 mr-1" />
                                      Try On
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about fashion and style..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Suggestions</CardTitle>
                <CardDescription>Try these popular questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-wrap"
                    onClick={() => handleQuickSuggestion(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>Mood-based styling</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span>Natural conversation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShoppingBag className="w-4 h-4 text-green-500" />
                  <span>Smart recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="w-4 h-4 text-purple-500" />
                  <span>Virtual try-on integration</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
