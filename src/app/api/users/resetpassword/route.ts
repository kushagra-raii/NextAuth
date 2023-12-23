import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/dbConfig";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("request ki body", reqBody);
    
    const { token, data } = reqBody;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });


console.log("user",user);


    if (!user) {
        return NextResponse.json({
            success: false,
            message: "Invalid Token, User not Found",
            status: 400,
          });  
    }

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    if(password === "" && password === confirmPassword){
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Password Updated successfully",
            status: 200,
          });
        
    }
    else {
        return NextResponse.json({
            success: false,
            message: "Password didnt match",
            status: 400,
          }); 
    }

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
      status: 500,
    });
  }
}
