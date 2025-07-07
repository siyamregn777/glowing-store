'use client'
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeaderSlider from "../components/HeaderSlider";
import HomeProducts from "../components/HomeProducts";
import Banner from "../components/Banner";
import NewsLetter from "../components/NewsLetter";
import FeaturedProduct from "../components/FeaturedProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Optional: Redirect based on user role
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === 'seller') {
      router.push('/seller/dashboard');
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar user={session?.user} />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;