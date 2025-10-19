"use client";

import { useEffect, useState } from "react";
import { Folder, Plus, Archive, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Bucket {
  id: string;
  name: string;
  count: number;
}

interface SidebarProps {
  buckets: Bucket[];
  selectedBucketId: string | null;
  onSelectBucket: (bucketId: string | null) => void;
  onCreateBucket: () => void;
  draggedItemId: string | null;
  onMoveItem: (itemId: string, bucketId: string) => void;
}

export function Sidebar({
  buckets,
  selectedBucketId,
  onSelectBucket,
  onCreateBucket,
  draggedItemId,
  onMoveItem,
}: SidebarProps) {
  const [dragOverBucketId, setDragOverBucketId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleDragOver = (e: React.DragEvent, bucketId: string | null) => {
    e.preventDefault();
    setDragOverBucketId(bucketId);
  };

  const handleDragLeave = () => {
    setDragOverBucketId(null);
  };

  const handleDrop = (e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    if (draggedItemId) {
      onMoveItem(draggedItemId, bucketId);
    }
    setDragOverBucketId(null);
    if (isMobile) setIsOpen(false); // auto-close after drop
  };

  const handleSelect = (bucketId: string | null) => {
    onSelectBucket(bucketId);
    if (isMobile) setIsOpen(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.touches[0].clientX - touchStartX;
    if (diff < -50) {
      setIsOpen(false);
      setTouchStartX(null);
    }
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 fixed top-4 left-1 z-50 bg-sidebar text-white rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed top-0 left-0 h-full z-40 transition-transform",
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0 static"
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="p-6 px-20 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Buckets
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handleSelect(null)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors",
              selectedBucketId === null
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <div className="flex items-center gap-3">
              <Archive className="w-4 h-4" />
              <span className="font-medium">All Items</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {buckets.reduce((total, bucket) => total + bucket.count, 0)}
            </span>
          </button>

          {/* Bucket List */}
          <div className="space-y-1">
            {buckets.map((bucket) => (
              <button
                key={bucket.id}
                onClick={() => handleSelect(bucket.id)}
                onDragOver={(e) => handleDragOver(e, bucket.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, bucket.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200",
                  selectedBucketId === bucket.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  draggedItemId &&
                  dragOverBucketId === bucket.id &&
                  "bg-primary/20 border-2 border-primary border-dashed"
                )}
              >
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4" />
                  <span className="font-medium truncate">{bucket.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {bucket.count}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={onCreateBucket}
            variant="outline"
            className="w-full justify-start gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
          >
            <Plus className="w-4 h-4" />
            New Bucket
          </Button>
        </div>
      </aside>
    </>
  );
}
