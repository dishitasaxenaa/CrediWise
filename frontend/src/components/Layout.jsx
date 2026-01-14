"use client"

import React from "react"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-blue-900/10 to-slate-900/30 pointer-events-none" />
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-40 w-56 sm:w-80 h-56 sm:h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full text-white shadow-lg hover:shadow-cyan-500/40 transition-all"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="relative z-10 p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed md:relative left-0 top-0 w-[250px] bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-r border-slate-700/30 p-6 sm:p-8 flex flex-col h-screen z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-xl sm:text-2xl font-bold mb-8 sm:mb-12 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
            CB
          </div>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-lg sm:text-xl">
            CredWise
          </span>
        </div>
        <nav className="flex flex-col gap-2">
          {["Dashboard", "Transactions", "Eco-Market", "Settings"].map((label) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                label === "Dashboard"
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 border border-transparent"
              }`}
              onClick={() => {
                if (label !== "Dashboard") onClose()
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}
