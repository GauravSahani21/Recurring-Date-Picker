import { RecurringDatePicker } from "@/components/recurring-date-picker/recurring-date-picker";
import React from "react";
import "@/app/globals.css";
import { Github, Linkedin } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Enhanced Recurring Date Picker
          </h1>
        </div>

        <RecurringDatePicker />

        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6">Enhanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-medium mb-3 text-blue-600">
                  🚀 Core Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Daily, Weekly, Monthly, Yearly patterns</li>
                  <li>• Custom intervals and complex patterns</li>
                  <li>• Visual calendar preview</li>
                  <li>• Real-time validation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-green-600">
                  ✨ Advanced Options
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Quick preset patterns</li>
                  <li>• Time selection support</li>
                  <li>• Date exclusion system</li>
                  <li>• Maximum occurrence limits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-purple-600">
                  📤 Export & Integration
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• JSON, CSV, iCal export</li>
                  <li>• Comprehensive summaries</li>
                  <li>• Error validation</li>
                  <li>• TypeScript support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4 text-gray-700">
            <span className="cursor-zoom-in">Designed and Developed by © Gaurav Sahani</span>

            <a
              href="https://github.com/GauravSahani21"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:text-black hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/gauravsahani21/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
