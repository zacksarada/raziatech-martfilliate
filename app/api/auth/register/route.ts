import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate affiliate code
    const affiliateCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "AFFILIATE",
        affiliateCode,
      }
    });

    // Return user tanpa password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "User created successfully", 
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}