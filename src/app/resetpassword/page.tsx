"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ResetPassword = () => {
    const router = useRouter();
  const [token, setToken] = useState("");
  const [data, setData] = useState({ password: "", confirmPassword:"" });

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setData((prev)=>{
        return {
            ...prev ,
            [event.target.name] : event.target.value,
        }
    })
  };


  const updatePassword = async () => {
    const response = await axios.post("/api/users/resetpassword",{data,token},);
    console.log(response);
    router.push("/login");

    
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col justify-center w-1/3 gap-2">
        <h1>Reset Password</h1>
        <label htmlFor="password"></label>
        <input
          className=" rounded-md p-2 text-black"
          onChange={changeHandler}
          type="password"
          id="password"
          name="password"
        />

        <label htmlFor="confirmPassword"></label>
        <input
          className=" rounded-md p-2 text-black"
          onChange={changeHandler}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />

        <button onClick={updatePassword} className="border rounded-lg mt-5 py-3"> 
            Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
