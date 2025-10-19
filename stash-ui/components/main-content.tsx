"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ItemCard } from "@/components/item-card"

interface Item {
  id: string
  type: "link" | "text"
  title: string
  url?: string
  content?: string
  bucketId: string
  createdAt: Date
}

interface MainContentProps {
  items: Item[]
  bucketName: string
  onAddItem: () => void
  onDragStart: (itemId: string) => void
  onDragEnd: () => void
}

export function MainContent({ items, bucketName, onAddItem, onDragStart, onDragEnd }: MainContentProps) {
  return (
    <main className="flex-1 flex flex-col bg-background">
      {/* Content Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Viewing: {bucketName}</h2>
            <p className="text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Button onClick={onAddItem} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 p-6 overflow-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No items yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Start building your collection by adding links, notes, and other content to this bucket.
            </p>
            <Button onClick={onAddItem} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onDragStart={onDragStart} onDragEnd={onDragEnd} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
