"use client";
import React, { useMemo } from 'react';
import { assets } from "../../../assets/assets";
import ProductCard from "../../../components/ProductCard";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";
import { useAppContext } from "../../../context/AppContext";

const ProductPage = () => {
  const { id } = useParams();
  const { products, addToCart } = useAppContext();
  
  const productData = useMemo(() => 
    products.find(product => product._id === id),
    [id, products]
  );

  const [mainImage, setMainImage] = React.useState(null);
  const featuredProducts = useMemo(() => products.slice(0, 5), [products]);

  if (!productData) return <Loading />;

  return (
    <>
      <Navbar />
      <main className="px-4 md:px-8 lg:px-12 py-8 max-w-7xl mx-auto space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                className="object-contain w-full h-full mix-blend-multiply"
                width={600}
                height={600}
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {productData.image.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="aspect-square bg-gray-100 rounded overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full mix-blend-multiply"
                    width={150}
                    height={150}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold">{productData.name}</h1>
            
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array(4).fill(0).map((_, i) => (
                  <Image key={i} src={assets.star_icon} alt="Star" width={16} height={16} />
                ))}
                <Image src={assets.star_dull_icon} alt="Star" width={16} height={16} />
              </div>
              <span className="text-sm">(4.5)</span>
            </div>

            <p className="text-gray-600">{productData.description}</p>

            <div className="space-y-1">
              <p className="text-2xl font-semibold">
                ${productData.offerPrice}
                <span className="ml-2 text-base font-normal text-gray-500 line-through">
                  ${productData.price}
                </span>
              </p>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-4">
              <table className="w-full max-w-md">
                <tbody className="divide-y divide-gray-200">
                  {[
                    ['Brand', 'Generic'],
                    ['Color', 'Multi'],
                    ['Category', productData.category],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-2 font-medium text-gray-600">{label}</td>
                      <td className="py-2 text-gray-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => addToCart(productData._id)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  addToCart(productData._id);
                  router.push('/cart');
                }}
                className="flex-1 py-3 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Featured <span className="text-orange-500">Products</span>
            </h2>
            <div className="w-20 h-0.5 bg-orange-500 mx-auto mt-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <button className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
              View More
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;








// "use client"
// import { useEffect, useState } from "react";
// import { assets } from "../../../assets/assets";
// import ProductCard from "../../../components/ProductCard";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import Loading from "../../../components/Loading";
// import { useAppContext } from "../../../context/AppContext";
// import React from "react";

// const Product = () => {

//     const { id } = useParams();

//     const { products, router, addToCart } = useAppContext()

//     const [mainImage, setMainImage] = useState(null);
//     const [productData, setProductData] = useState(null);

//     const fetchProductData = async () => {
//         const product = products.find(product => product._id === id);
//         setProductData(product);
//     }

//     useEffect(() => {
//         fetchProductData();
//     }, [id, products.length])

//     return productData ? (<>
//         <Navbar />
//         <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//                 <div className="px-5 lg:px-16 xl:px-20">
//                     <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
//                         <Image
//                             src={mainImage || productData.image[0]}
//                             alt="alt"
//                             className="w-full h-auto object-cover mix-blend-multiply"
//                             width={1280}
//                             height={720}
//                         />
//                     </div>

//                     <div className="grid grid-cols-4 gap-4">
//                         {productData.image.map((image, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => setMainImage(image)}
//                                 className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
//                             >
//                                 <Image
//                                     src={image}
//                                     alt="alt"
//                                     className="w-full h-auto object-cover mix-blend-multiply"
//                                     width={1280}
//                                     height={720}
//                                 />
//                             </div>

//                         ))}
//                     </div>
//                 </div>

//                 <div className="flex flex-col">
//                     <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
//                         {productData.name}
//                     </h1>
//                     <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-0.5">
//                             <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
//                             <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
//                             <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
//                             <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
//                             <Image
//                                 className="h-4 w-4"
//                                 src={assets.star_dull_icon}
//                                 alt="star_dull_icon"
//                             />
//                         </div>
//                         <p>(4.5)</p>
//                     </div>
//                     <p className="text-gray-600 mt-3">
//                         {productData.description}
//                     </p>
//                     <p className="text-3xl font-medium mt-6">
//                         ${productData.offerPrice}
//                         <span className="text-base font-normal text-gray-800/60 line-through ml-2">
//                             ${productData.price}
//                         </span>
//                     </p>
//                     <hr className="bg-gray-600 my-6" />
//                     <div className="overflow-x-auto">
//                         <table className="table-auto border-collapse w-full max-w-72">
//                             <tbody>
//                                 <tr>
//                                     <td className="text-gray-600 font-medium">Brand</td>
//                                     <td className="text-gray-800/50 ">Generic</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="text-gray-600 font-medium">Color</td>
//                                     <td className="text-gray-800/50 ">Multi</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="text-gray-600 font-medium">Category</td>
//                                     <td className="text-gray-800/50">
//                                         {productData.category}
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="flex items-center mt-10 gap-4">
//                         <button onClick={() => addToCart(productData._id)} className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
//                             Add to Cart
//                         </button>
//                         <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition">
//                             Buy now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex flex-col items-center">
//                 <div className="flex flex-col items-center mb-4 mt-16">
//                     <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
//                     <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
//                     {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
//                 </div>
//                 <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
//                     See more
//                 </button>
//             </div>
//         </div>
//         <Footer />
//     </>
//     ) : <Loading />
// };

// export default Product;
