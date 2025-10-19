"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { AddItemModal } from "@/components/add-item-modal"
import { CreateBucketModal } from "@/components/create-bucket-modal"

// Mock data for initial state
const initialBuckets = [
  { id: "1", name: "Project Ideas", count: 5 },
  { id: "2", name: "Code Snippets", count: 12 },
  { id: "3", name: "Design Inspiration", count: 8 },
]

const initialItems = [
  {
    id: "1",
    type: "link" as const,
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    bucketId: "2",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "text" as const,
    title: "Meeting Notes",
    content: "Discussed the new feature requirements and timeline for Q1...",
    bucketId: "1",
    createdAt: new Date(),
  },
  {
    id: "3",
    type: "link" as const,
    title: "Dribbble - UI Inspiration",
    url: "https://dribbble.com",
    bucketId: "3",
    createdAt: new Date(),
  },
]

export default function Dashboard() {
  const [buckets, setBuckets] = useState(initialBuckets)
  const [items, setItems] = useState(initialItems)
  const [selectedBucketId, setSelectedBucketId] = useState<string | null>(null)
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)
  const [isCreateBucketModalOpen, setIsCreateBucketModalOpen] = useState(false)
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null)

  const selectedItems = selectedBucketId ? items.filter((item) => item.bucketId === selectedBucketId) : items

  const selectedBucketName = selectedBucketId
    ? buckets.find((b) => b.id === selectedBucketId)?.name || "Unknown"
    : "All Items"

  const handleMoveItem = (itemId: string, newBucketId: string) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, bucketId: newBucketId } : item)))

    setBuckets((prevBuckets) =>
      prevBuckets.map((bucket) => {
        const itemsInBucket = items.filter((item) =>
          item.id === itemId ? newBucketId === bucket.id : item.bucketId === bucket.id,
        ).length
        return { ...bucket, count: itemsInBucket }
      }),
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onAddItem={() => setIsAddItemModalOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          buckets={buckets}
          selectedBucketId={selectedBucketId}
          onSelectBucket={setSelectedBucketId}
          onCreateBucket={() => setIsCreateBucketModalOpen(true)}
          draggedItemId={draggedItemId}
          onMoveItem={handleMoveItem}
        />

        <MainContent
          items={selectedItems}
          bucketName={selectedBucketName}
          onAddItem={() => setIsAddItemModalOpen(true)}
          onDragStart={setDraggedItemId}
          onDragEnd={() => setDraggedItemId(null)}
        />
      </div>

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        buckets={buckets}
        onAddItem={(item) => {
          setItems((prev: any) => [...prev, { ...item, id: Date.now().toString(), createdAt: new Date() }])
          setIsAddItemModalOpen(false)
        }}
      />

      <CreateBucketModal
        isOpen={isCreateBucketModalOpen}
        onClose={() => setIsCreateBucketModalOpen(false)}
        onCreateBucket={(name) => {
          setBuckets((prev) => [...prev, { id: Date.now().toString(), name, count: 0 }])
          setIsCreateBucketModalOpen(false)
        }}
      />
    </div>
  )
}
