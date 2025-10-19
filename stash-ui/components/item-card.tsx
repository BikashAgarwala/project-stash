"use client"

import type React from "react"

import { useState } from "react"
import { ExternalLink, FileText, Copy, Trash2, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Item {
  id: string
  type: "link" | "text"
  title: string
  url?: string
  content?: string
  bucketId: string
  createdAt: Date
}

interface ItemCardProps {
  item: Item
  onDragStart: (itemId: string) => void
  onDragEnd: () => void
}

export function ItemCard({ item, onDragStart, onDragEnd }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleCopy = () => {
    const textToCopy = item.type === "link" ? item.url : item.content
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
    }
  }

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete item:", item.id)
  }

  const handleCardClick = () => {
    if (item.type === "link" && item.url) {
      window.open(item.url, "_blank")
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    onDragStart(item.id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    onDragEnd()
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "relative group cursor-pointer transition-all duration-200 hover:shadow-lg border-border bg-card",
        item.type === "link" && "hover:shadow-primary/10",
        isDragging && "opacity-50 scale-95 rotate-2",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        {/* Action Buttons */}
        {isHovered && !isDragging && (
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 bg-secondary/80 hover:bg-secondary"
              onClick={(e) => {
                e.stopPropagation()
                handleCopy()
              }}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 bg-secondary/80 hover:bg-destructive hover:text-destructive-foreground"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Icon and Type */}
          <div className="flex items-center gap-2">
            {item.type === "link" ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                  <Globe className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Link</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent/10 rounded flex items-center justify-center">
                  <FileText className="w-3 h-3 text-accent" />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Text</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-card-foreground line-clamp-2 text-balance">{item.title}</h3>

          {/* Content Preview */}
          {item.type === "link" && item.url && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {new URL(item.url).hostname}
              </p>
            </div>
          )}

          {item.type === "text" && item.content && (
            <p className="text-sm text-muted-foreground line-clamp-3 text-pretty">{item.content}</p>
          )}

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground">{item.createdAt.toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
