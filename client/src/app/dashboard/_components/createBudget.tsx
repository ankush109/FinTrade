"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGetUserDetailsQuery } from "@/hooks/query/useGetUserDetails";

const FinanceLimitModal = ({ onSubmit }) => {
  const { data: userdata } = useGetUserDetailsQuery();
  const budget = userdata?.budget;

  const [form, setForm] = useState({
    money: "",
    warnings: false,
    upperLimit: "",
    lowerLimit: "",
  });

  // Prefill form when budget data is available
  useEffect(() => {
    if (budget) {
      setForm({
        money: budget.money?.toString() || "",
        warnings: !!budget.warnings,
        upperLimit: budget.upperLimit?.toString() || "",
        lowerLimit: budget.lowerLimit?.toString() || "",
      });
    }
  }, [budget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setForm((prev) => ({ ...prev, warnings: !!checked }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Set Financial Limits
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[400px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Set Your Limits
            </h2>

            <div>
              <Label htmlFor="money">Money</Label>
              <Input
                name="money"
                type="text"
                value={form.money}
                onChange={handleChange}
                placeholder="Enter money"
              />
            </div>

            <div>
              <Label htmlFor="upperLimit">Upper Limit</Label>
              <Input
                name="upperLimit"
                type="text"
                value={form.upperLimit}
                onChange={handleChange}
                placeholder="Enter upper limit"
              />
            </div>

            <div>
              <Label htmlFor="lowerLimit">Lower Limit</Label>
              <Input
                name="lowerLimit"
                type="text"
                value={form.lowerLimit}
                onChange={handleChange}
                placeholder="Enter lower limit"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="warnings"
                checked={form.warnings}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="warnings" className="text-sm font-medium">
                Enable warnings
              </Label>
            </div>

            <Button
              onClick={handleSubmit}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinanceLimitModal;
