"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "../assets/assets";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import logo from "../assets/Logo.png";
import { useRef } from "react";

const Navbar = () => {
  const { isSeller, router, user, session, status } = useAppContext();

  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current?.focus();
  }
  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-20 py-2 border-b border-gray-300 text-gray-700 h-16">
      <div className="tracking-tight cursor-pointer hover:transition-all hover:scale-150 hover:duration-700" onClick={()=>router.push('/')}>
        <span className="text-red-500">ONE</span><span>Place</span> 
      </div>
      {/* <Image
        className="cursor-pointer w-24 md:w-28 object-contain hover:scale-150 transition-transform duration-200 ease-in-out"
        onClick={() => router.push('/')}
        src={logo}
        alt="logo"
        width={112}
        height={40}
      /> */}
      
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition text-sm rounded-full px-4 m-5 py-1 hover:bg-gradient-to-r from-blue-200 to-blue-50">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition text-sm hover:bg-gradient-to-r from-blue-300 to-blue-50 rounded-full px-4 m-5 py-1">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition text-sm hover:bg-gradient-to-r from-blue-300 to-blue-50 rounded-full px-4 m-5 py-1">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition text-sm hover:bg-gradient-to-r from-blue-300 to-blue-50 rounded-full px-4 m-5 py-1">
          Contact
        </Link>

        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 border hover:border-black border-gray-300 rounded-full px-2 py-1">
          <Image
            src={assets.search_icon}
            alt="search icon"
            width={16}
            height={16}
            className="w-4 h-4 cursor-pointer"
            onClick={focusInput}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="w-48 outline-none bg-transparent px-2 text-sm"
          />
          </div>

        
        
        {status === "authenticated" ? (
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/cart')} className="flex items-center gap-1">
              <Image src={CartIcon} alt="cart icon" width={16} height={16} />
              <span>Cart</span>
            </button>
            <button onClick={() => router.push('/my-orders')} className="flex items-center gap-1">
              <Image src={BagIcon} alt="orders icon" width={16} height={16} />
              <span>Orders</span>
            </button>
            <div className="relative group">
              <Image 
                src={user?.image || assets.user_icon} 
                alt="user avatar" 
                width={32} 
                height={32}
                className="rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <button 
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="flex items-center gap-2 hover:text-gray-900 transition text-sm bg-gradient-to-l from-green-700 to-red-300 
            hover:bg-white rounded-full px-2 py-1 text-white"
          >
            <Image src={assets.user_icon} alt="user icon" width={16} height={16} />
            Create An Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
        {status === "authenticated" ? (
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/cart')}>
              <Image src={CartIcon} alt="cart icon" width={20} height={20} />
            </button>
            <Image 
              src={user?.image || assets.user_icon} 
              alt="user avatar" 
              width={32} 
              height={32}
              className="rounded-full cursor-pointer"
              onClick={() => router.push('/account')}
            />
          </div>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="flex items-center gap-2 hover:text-green-900 transition text-sm hover:bg-blue-200 rounded-full px-2 py-1"
          >
            <Image src={assets.user_icon} alt="user icon" width={16} height={16} />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;