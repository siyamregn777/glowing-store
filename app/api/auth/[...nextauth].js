// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import authOptions from "@/lib/auth";

export default NextAuth(authOptions);