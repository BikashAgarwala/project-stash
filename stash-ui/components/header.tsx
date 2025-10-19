"use client"

import { Search, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Logo from "../public/stash-logo.png"

interface HeaderProps {
  onAddItem: () => void
}

export function Header({ onAddItem }: HeaderProps) {
  return (
    <header className="h-20 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-6">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2">
        <Image src={Logo || "/stash-logo.png"} alt="Stash" height={30} width={200}  className="" />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search all items..."
            className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground focus:ring-sidebar-primary"
          />
        </div>
      </div>

      {/* User Profile and Add Item Button */}
      <div className="flex items-center gap-4">
        <Button onClick={onAddItem} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          + <span className="max-lg:hidden"> Add Item </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
