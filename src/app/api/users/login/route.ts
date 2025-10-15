import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connectToDB();

    try {
        const { email, password } = await request.json();

        // check if user exists with email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User does not exist with this email",
                },
                { status: 400 }
            );
        }

        // compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                { status: 400 }
            );
        }

        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }; 
        
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json(
            {
                success: true,
                message: "User logged in successfully"
            }
        );

        // set token in http-only cookie
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error) {
        console.log("Error during user login:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
        
    }
}