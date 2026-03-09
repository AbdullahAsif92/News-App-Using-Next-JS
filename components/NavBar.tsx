'use client'
import Link from "next/link"
import { useState } from "react"

const NavBar = () => {
  const [isClick, setIsCLick] = useState(false);
  const handleOnClick = () => {
    setIsCLick(!isClick);
  }
  const categories = ["business", "technology", "sports","entertainment","health","science"];
  return (
    <header className="w-full bg-black font-poppins">
      <div className="max-w-350 mx-auto flex justify-between items-center p-4 text-white">
        <Link href="/" className="text-xl font-bold">News <span className="text-yellow-400">App</span></Link>


        <ul className="hidden md:flex md:gap-6 md:items-center md:text-xl">
          <li>
            <Link href={`/`} className="hover:text-yellow-400">Home</Link>
          </li>
          {categories.map(cat => (
            <li key={cat}>
              <Link href={`/category/${cat}`} className="hover:text-yellow-400">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
          <div className="md:hidden" onClick={handleOnClick}> 
            {isClick ? (
              <div className="text-2xl w-7">X</div>
            ) : (
              <div>
                <div className="w-7 h-0.5 bg-white my-2"></div>
                <div className="w-7 h-0.5 bg-white my-2"></div>
                <div className="w-7 h-0.5 bg-white my-2"></div>
              </div>
            )}
          </div>
      </div>
        {isClick && (
          <ul className="flex md:hidden flex-col text-white p-4 border-t text-xl gap-1">
            <li>
            <Link href={`/`} className="hover:text-yellow-400">Home</Link>
          </li>
            {categories.map(cat => (
              <li key={cat}>
                <Link href={`/category/${cat}`} className="hover:text-yellow-400">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        )}
    </header>
  )
}

export default NavBar