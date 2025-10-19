"use client"

import type React from "react"

import { useState } from "react"
import { Link, FileText, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Bucket {
  id: string
  name: string
  count: number
}

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  buckets: Bucket[]
  onAddItem: (item: {
    type: "link" | "text"
    title: string
    url?: string
    content?: string
    bucketId: string
  }) => void
}

export function AddItemModal({ isOpen, onClose, buckets, onAddItem }: AddItemModalProps) {
  const [itemType, setItemType] = useState<"link" | "text">("link")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [content, setContent] = useState("")
  const [selectedBucketId, setSelectedBucketId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !selectedBucketId) return

    if (itemType === "link" && !url.trim()) return
    if (itemType === "text" && !content.trim()) return

    onAddItem({
      type: itemType,
      title: title.trim(),
      url: itemType === "link" ? url.trim() : undefined,
      content: itemType === "text" ? content.trim() : undefined,
      bucketId: selectedBucketId,
    })

    // Reset form
    setTitle("")
    setUrl("")
    setContent("")
    setSelectedBucketId("")
    setItemType("link")
  }

  const handleClose = () => {
    setTitle("")
    setUrl("")
    setContent("")
    setSelectedBucketId("")
    setItemType("link")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add to Stash</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Item Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={itemType === "link" ? "default" : "outline"}
                className={cn(
                  "flex-1 justify-start gap-2",
                  itemType === "link" && "bg-primary text-primary-foreground",
                )}
                onClick={() => setItemType("link")}
              >
                <Link className="w-4 h-4" />
                Link
              </Button>
              <Button
                type="button"
                variant={itemType === "text" ? "default" : "outline"}
                className={cn(
                  "flex-1 justify-start gap-2",
                  itemType === "text" && "bg-primary text-primary-foreground",
                )}
                onClick={() => setItemType("text")}
              >
                <FileText className="w-4 h-4" />
                Text
              </Button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this item"
              required
            />
          </div>

          {/* URL or Content */}
          {itemType === "link" ? (
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your text content here..."
                rows={4}
                required
              />
            </div>
          )}

          {/* Bucket Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Save to Bucket</Label>
            <Select value={selectedBucketId} onValueChange={setSelectedBucketId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a bucket" />
              </SelectTrigger>
              <SelectContent>
                {buckets.map((bucket) => (
                  <SelectItem key={bucket.id} value={bucket.id}>
                    {bucket.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={
                !title.trim() ||
                !selectedBucketId ||
                (itemType === "link" && !url.trim()) ||
                (itemType === "text" && !content.trim())
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
