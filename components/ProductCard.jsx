import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from "../assets/assets";
import { useAppContext } from '../context/AppContext';

const ProductCard = React.memo(({ product }) => {
  const { currency } = useAppContext();
  
  // Pre-calculate stars to avoid re-rendering
  const stars = Array(5).fill(0).map((_, i) => (
    <Image
      key={i}
      className="h-3 w-3"
      src={i < 4 ? assets.star_icon : assets.star_dull_icon}
      alt={i < 4 ? "star icon" : "dull star icon"}
      width={12}
      height={12}
    />
  ));

  return (
    <Link 
      href={`/product/${product._id}`}
      className="flex flex-col items-start gap-1 max-w-[200px] w-full group"
      scroll={false}
    >
      <div className="relative bg-gray-500/10 rounded-lg w-full aspect-square flex items-center justify-center overflow-hidden">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition-transform duration-300 object-contain w-4/5 h-4/5"
          width={200}
          height={200}
          priority={false}
        />
        <button 
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
          onClick={(e) => e.preventDefault()}
          aria-label="Add to wishlist"
        >
          <Image
            src={assets.heart_icon}
            alt="Wishlist"
            width={12}
            height={12}
          />
        </button>
      </div>

      <div className="w-full pt-2 space-y-1">
        <h3 className="font-medium truncate">{product.name}</h3>
        <p className="text-xs text-gray-500/70 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-1">
          <span className="text-xs">4.5</span>
          <div className="flex">{stars}</div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{currency}{product.offerPrice}</span>
          <button 
            className="px-3 py-1 text-gray-500 border border-gray-200 rounded-full text-xs hover:bg-gray-50 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Buy now
          </button>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;




// import React from 'react'
// import { assets } from "../assets/assets";
// import Image from 'next/image';
// import { useAppContext } from '../context/AppContext';


// const ProductCard = ({ product }) => {

//     const { currency, router } = useAppContext()

//     return (
//         <div
//             onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
//             className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
//         >
//             <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
//                 <Image
//                     src={product.image[0]}
//                     alt={product.name}
//                     className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
//                     width={800}
//                     height={800}
//                 />
//                 <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
//                     <Image
//                         className="h-3 w-3"
//                         src={assets.heart_icon}
//                         alt="heart_icon"
//                     />
//                 </button>
//             </div>

//             <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
//             <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
//             <div className="flex items-center gap-2">
//                 <p className="text-xs">{4.5}</p>
//                 <div className="flex items-center gap-0.5">
//                     {Array.from({ length: 5 }).map((_, index) => (
//                         <Image
//                             key={index}
//                             className="h-3 w-3"
//                             src={
//                                 index < Math.floor(4)
//                                     ? assets.star_icon
//                                     : assets.star_dull_icon
//                             }
//                             alt="star_icon"
//                         />
//                     ))}
//                 </div>
//             </div>

//             <div className="flex items-end justify-between w-full mt-1">
//                 <p className="text-base font-medium">{currency}{product.offerPrice}</p>
//                 <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
//                     Buy now
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default ProductCard