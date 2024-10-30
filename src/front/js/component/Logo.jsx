import { TrendingUp } from "lucide-react"
import React from "react"


export const Logo = ()=> {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-12 h-12 text-green-500" />
          <span className="text-4xl font-bold text-gray-800">
            andi<span className="text-green-500">gu</span>
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 font-semibold">Financial Solutions</p>
      </div>
    </div>
  )
}