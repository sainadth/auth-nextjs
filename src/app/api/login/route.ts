import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("Started Login");

    const reqBody = await request.json();
    const { email, password } = reqBody;
    // console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User doesn't exist",
        status: 400,
      });
    }
    console.log(user);

    //user exits authenticate

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        error: "Invalid Password",
        status: 400,
      });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token JWT
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    console.log("Login Ended");
    return response;
  } catch (error) {
    console.log("Authentication failed", error);
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
