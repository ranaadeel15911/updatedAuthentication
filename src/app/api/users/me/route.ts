import connect from "@/dbConfig/dbConfig";
import { fetchDataFromToken } from "@/helpers/fetchDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
try {
    const userId = await fetchDataFromToken(request)
     const user=await User.findOne({
        _id:userId
     }).select("-password -isAdmin")
    //  }).select("-password -isAdmin")
    return NextResponse.json({
        message:'user found',
        data:user
    })
} catch (error:any) {
    return NextResponse.json({
        error:error.message
    },
    {status:400})
}
}