"use client";
import React, { useEffect, useState } from "react";
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
import { DatePicker } from "@mui/x-date-pickers";
import { createEvent } from "../../../../api/ngo";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title must have minimum of 2 charecters",
  }),
  description: z.string().min(2, {
    message: "Description must have minimum of 2 charecters",
  }),
  location: z.string(),
  stdate: z.date({ required_error: "Event starting date is required" }),
  endate: z.date({ required_error: "Event ending date is required" }),
  dates: z.array(z.date({ required_error: "Event date is required" })),
  funding: z.number(),
});

function Ngoform() {
  // const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [dts, setDts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      stdate: new Date(),
      endate: new Date(),
      dates: [],
      funding: 0,
    },
  });

  // const handleDateChange = (newDate) => {
  //   if (newDate) {
  //     form.setValue("dates", newDate.toDate());
  //   }
  // };

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      console.log(startDate, endDate);

      setButtonDisabled(false);
      form.setValue("dates", [startDate, endDate]);

      console.log(form.getValues("dates"));
      const data = await createEvent(formData);
      // const { data } = response;
      console.log("datas", data);
      toast.success("Event is created successfylly");
    } catch (error) {
      toast.error("error in creating ngo event");
    }
  };

  const handleStDateChange = (newDate) => {
    const dateValue = newDate.$d;
    setStartDate(dateValue);
    form.setValue("stdate", dateValue);
  };

  const handleEnDateChange = (newDate) => {
    const dateValue = newDate.$d;
    setEndDate(dateValue);
    form.setValue("endate", dateValue);
  };

  return (
    <div className="w-4/5 my-auto mx-auto flex flex-col gap-10 pb-10">
      <div className="text-4xl font-semibold">
        Please Enter Your Details About Ngo Program
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Event-title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Input placeholder="Event-description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="flex justify-between">Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage>
                  <FormDescription>
                    Please provide a valid location.
                    <br />
                  </FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="funding"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="flex justify-between">
                  Fund Raised
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Funding"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage>
                  <FormDescription>
                    Please provide a valid location.
                    <br />
                  </FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stdate"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="flex justify-between">
                  Start Date of event
                </FormLabel>
                <FormControl>
                  <DatePicker
                    // label="Select a starting date"
                    // onChange={(newDate) => handleStDateChange(newDate)}
                    label="Select a starting date"
                    onChange={handleStDateChange}
                    // value={startDate}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endate"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="flex justify-between">
                  Start Date of event
                </FormLabel>
                <FormControl>
                  <DatePicker
                    // label="Select a starting date"
                    // onChange={(newDate) => handleEnDateChange(newDate)}
                    label="Select an ending date"
                    onChange={handleEnDateChange}
                    // value={endDate}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={buttonDisabled}>
            Create Event
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Ngoform;
