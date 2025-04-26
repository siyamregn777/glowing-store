import React from 'react'
import { assets } from "../assets/assets";
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    const { currency } = useAppContext()

    return (
        <div className="flex flex-col items-start gap-0.5 max-w-[200px] w-full">
            {/* Wrap only the clickable image area with Link */}
            <Link 
                href={`/product/${product._id}`} 
                className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center"
                scroll={false} // This prevents automatic scrolling
            >
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                {/* Heart button should have its own click handler */}
                <button 
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Handle wishlist logic here
                    }}
                >
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </Link>

            {/* Product info that's also clickable */}
            <Link 
                href={`/product/${product._id}`} 
                className="w-full"
                scroll={false}
            >
                <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
                <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
                <div className="flex items-center gap-2">
                    <p className="text-xs">{4.5}</p>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-3 w-3"
                                src={
                                    index < Math.floor(4)
                                        ? assets.star_icon
                                        : assets.star_dull_icon
                                }
                                alt="star_icon"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-end justify-between w-full mt-1">
                    <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                    <button 
                        className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
                        onClick={(e) => {
                            e.preventDefault();
                            // Optionally handle direct buy logic here
                        }}
                    >
                        Buy now
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard