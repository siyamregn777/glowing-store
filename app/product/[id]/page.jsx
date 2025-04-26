"use client";
import React, { useMemo, useState } from 'react';
import { assets } from "../../../assets/assets";
import ProductCard from "../../../components/ProductCard";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";
import { useAppContext } from "../../../context/AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const ProductPage = () => {
  const { id } = useParams();
  const { products, addToCart, router } = useAppContext();
  
  const productData = useMemo(() => 
    products.find(product => product._id === id),
    [id, products]
  );

  const [mainImage, setMainImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const featuredProducts = useMemo(() => products.slice(0, 5), [products]);

  const handleAddToCart = async () => {
    setIsProcessing(true);
    try {
      await addToCart(productData._id);
      toast.success('Added to cart successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error('Failed to add to cart', {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = async () => {
    setIsProcessing(true);
    try {
      await addToCart(productData._id);
      router.push('/cart');
    } catch (error) {
      toast.error('Failed to process order', {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!productData) return <Loading />;

  return (
    <>
      <Navbar />
      <ToastContainer />
      
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
                onClick={handleAddToCart}
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-md transition-colors ${
                  isProcessing 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {isProcessing ? 'Adding...' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-md text-white transition-colors ${
                  isProcessing
                    ? 'bg-orange-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
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
            <Link href="/all-products">
            <button className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
              View More
            </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;