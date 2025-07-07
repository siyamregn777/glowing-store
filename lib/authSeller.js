import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';

const authSeller = async (req) => {
  try {
    const token = await getToken({ req });
    
    if (!token) {
      return false;
    }

    const user = await User.findById(token.sub);
    
    if (user?.role === 'seller') {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export default authSeller;