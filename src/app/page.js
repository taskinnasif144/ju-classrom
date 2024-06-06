"use client";
import { access_token, token } from "@/Helpers/getLocalDatas";
import getDocumentByField from "@/firebase/firestore/queryData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [id, setID] = useState("");
  const [pass, setPass] = useState("");
  const [cookies, setCookies] = useCookies([token]);
  const router = useRouter();

  useEffect(() => {
    if (cookies.access_token) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toHomePage = async () => {
    if (id != "" && pass != "") {
      let document = await getDocumentByField("users", "ID", id);

      if (document) {
        if (document.defaultPass == pass) {
          setCookies(token, "hasToken");
          window.localStorage.setItem("designation", document.designation);
          window.localStorage.setItem("name", document.name);
          window.localStorage.setItem("ID", document.ID);
          window.localStorage.setItem("batch", document.batch);
          window.localStorage.setItem("department", document.department);
          window.localStorage.setItem("email", document.email);
          window.localStorage.setItem("username", document.userName);
          window.localStorage.setItem("dp", document.dp);
          toast.success("Successfully Authenticated!");

          window.location.href = "/dashboard";
        } else {
          toast.error("Credentials didn't match");
        }
      } else {
        toast.error("No such Account exists");
      }
    } else {
      toast.error("Please enter your credentials");
    }
  };
  return (
    <main className="w-full h-screen flex justify-center items-center ">
      <div className="flex flex-col shadow-2xl px-10 py-28 rounded-3xl">
        <h3 className="text-4xl pb-3">LOG IN</h3>
        <input
          className="w-96 px-4 py-2 mb-4"
          placeholder="Enter your login ID"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <input
          className="w-96 px-4 py-2"
          placeholder="Enter Your password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          onClick={toHomePage}
          className="w-96 bg-[#123C3E] text-white py-2 mt-6"
        >
          LOG IN
        </button>
        <h5 className="text-sm text-gray-400 text-center mt-7">
          Forget Password? <span className="text-red-700">Reset</span>
        </h5>
      </div>
      <Toaster />
    </main>
  );
}
