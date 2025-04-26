"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "../assets/assets";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import image from "../assets/Logo.png";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-20 py-2 border-b border-gray-300 text-gray-700 h-16">
      <Image
        className="cursor-pointer w-24 md:w-28 object-contain hover:scale-150 transition-transform duration-200 ease-in-out"
        onClick={() => router.push('/')}
        src={image}
        alt="logo"
        width={112}
        height={40} // Changed height from 10 to 40 for better balance
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition text-sm  hover:bg-blue-200 rounded-full px-2 py-1">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition text-sm  hover:bg-blue-200 rounded-full px-2 py-1">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition text-sm  hover:bg-blue-200 rounded-full px-2 py-1">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition text-sm  hover:bg-blue-200 rounded-full px-2 py-1">
          Contact
        </Link>

        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition text-sm">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-2 hover:text-green-900 transition text-sm   hover:bg-blue-200 rounded-full px-2 py-1">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
