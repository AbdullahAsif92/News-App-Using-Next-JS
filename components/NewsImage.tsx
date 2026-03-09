"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const fallbackImage = "/imrs.avif"

const NewsImage = ({ src, alt, className }: any) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackImage)
  const [key, setKey] = useState(Date.now())

  useEffect(() => {
    setImgSrc(src || fallbackImage)
    setKey(Date.now())
  }, [src])

  return (
    <Image
      key={key}
      src={imgSrc}
      alt={alt || "News image"}
      fill
      className={className}
      onError={() => setImgSrc(fallbackImage)}
    />
  )
}

export default NewsImage