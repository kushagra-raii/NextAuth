import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/dbConfig";
import User from "@/models/user";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request:NextRequest) {
    try {

        const {email} = await request.json();

        const user = await User.findOne({email});

        console.log(user);
        

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not Found, Please Enter your email correctly or Sign up",
                status: 400,
              });  
        }
        
        sendEmail({email,userId: user._id, emailType: "RESET"});

        return NextResponse.json({
            message: "Check your mail and update the password",
            success: true,
            status: 200,
          });


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            status: 500,
          }); 
    }
}