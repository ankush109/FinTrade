"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginUser } from "@/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(2, {
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function LoginForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setButtonDisabled(true);
    try {
      const response = await loginUser(formData);
      const { data } = response;
      if (response.status === 200) {
        localStorage.setItem("token", data.message.accessToken);
        router.push("/expense");
      }
      form.reset();
    } catch (err) {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600">
          Please login to your account or{" "}
          <Link href="/register" className="text-indigo-600 font-semibold">
            register
          </Link>{" "}
          if you don't have one.
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
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
                <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
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
      </Form>
    </div>
  );
}

export default LoginForm;
