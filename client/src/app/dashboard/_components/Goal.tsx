"use client"
import React, { useEffect } from 'react'
import { getmygoals } from "../../../api/goals/index"
import Comp2 from './comp2'
function Goal() {
    const { data } = getmygoals()
    useEffect(() => {
        console.log(data?.message, "data")
    })
    return (
        <div className='grid grid-cols-3 gap-5 m-2'>
            {data?.message.map((x) => {
                return (
                    <GoalCard goal={x} />
                )
            })}
        </div>
    )
}
export default Goal
const GoalCard = ({ goal }) => {
    return (
        
        <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg ">
    
            <div className='flex justify-between'>
            <h3 className="text-xl font-bold mb-4">{goal.name}</h3>
            <span className="font-medium text-blue-400">
                    {goal.type === "LONG_TERM" ? "Long Term" : "Short Term"}
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
            
             
            </p>
            <p className="text-lg text-gray-600 mb-4">
          
                <span className="font-medium text-blue-600">₹{goal.money}</span>
            </p>
           
            <div className='flex justify-end'>
                <p>
                    <span className="font-medium bg-[#B8E9D4] p-2 rounded-md ">
                        {new Date(goal.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </p>
            </div>

        </div>
    );
};
