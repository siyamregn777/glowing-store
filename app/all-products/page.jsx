'use client'
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAppContext } from "../../context/AppContext";
import Head from 'next/head';

const AllProducts = () => {
    const { products } = useAppContext();

    return (
        <>
            <Head>
                <title>All Products | Your Store Name</title>
                <meta name="description" content="Browse our complete collection of products" />
            </Head>
            
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <section className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
                    <div className="w-20 h-1 bg-orange-600 mx-auto rounded-full"></div>
                </section>

                {/* Products Grid */}
                <section>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => (
                                <ProductCard 
                                    key={product._id} // Use unique ID instead of index
                                    product={product} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No products available</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AllProducts;