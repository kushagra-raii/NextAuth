"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";



const Profile = () => {
  // const [data,setData] = React.useState("nothing");
  const router = useRouter();
  async function logout() {
    try {
      await axios.get("/api/users/logout");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async function userDetails(){
    try {
      const user = await axios.get("/api/users/userdetails");
      const username = user?.data?.data?.username;
      // setData(user.data.username);
      console.log(username);
      
      router.push(`/profile/${username}`)
      console.log(user);
      
    } catch (error: any) {
      console.error(error.message);
      
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p>Profile page</p>
      <button onClick={logout}>Logout</button>
      <button onClick={userDetails}>User Details</button>

    </div>
  );
};

export default Profile;
