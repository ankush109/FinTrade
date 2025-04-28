"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(3, {
    message: "Role must be at least 3 characters.",
  }),
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function RegisterForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setButtonDisabled(true);
    try {
      const { data } = await registerUser(formData);
      console.log("Registration Successful:", data);
      router.push("/login");
      form.reset();
    } catch (error) {
      console.error("Registration Error:", error);
      setButtonDisabled(false);
    }
  };

  return (
    <Form {...form}>
      <div className=" w-full   justify-around h-screen mx-auto p-20 flex flex-col gap-4">
        <div className="">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 text-sm">
            New to FinTrade ?{" "}
            <Link href="/register" className="text-indigo-600 font-semibold">
              Sign Up
            </Link>{" "}
          </p>
        </div>
        <div>
          <div
            className="
          border border-gray-300  rounded-lg p-2 flex items-center gap-2 cursor-pointer "
          >
            <div className="w-full flex gap-4 items-center justify-center rounded-lg">
              <Image
                alt="google"
                width={20}
                height={20}
                className="w-5 h-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
              />
              <h1> Continue with google</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <p className="text-gray-500">or</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={buttonDisabled}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg ${
              buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {buttonDisabled ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default RegisterForm;
