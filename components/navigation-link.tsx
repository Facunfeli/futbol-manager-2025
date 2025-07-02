"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function NavigationLink({ href, children, style, className }: NavigationLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Link href={href} onClick={handleClick} style={style} className={className} scroll={false}>
      {children}
    </Link>
  )
}
