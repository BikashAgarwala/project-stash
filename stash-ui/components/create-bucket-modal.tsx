"use client"

import type React from "react"

import { useState } from "react"
import { Folder, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateBucketModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateBucket: (name: string) => void
}

export function CreateBucketModal({ isOpen, onClose, onCreateBucket }: CreateBucketModalProps) {
  const [bucketName, setBucketName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!bucketName.trim()) return

    onCreateBucket(bucketName.trim())
    setBucketName("")
  }

  const handleClose = () => {
    setBucketName("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            New Bucket
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bucketName" className="text-sm font-medium">
              Bucket Name
            </Label>
            <Input
              id="bucketName"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              placeholder="e.g., Project Ideas, Code Snippets"
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground">Choose a descriptive name for organizing your items.</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!bucketName.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
