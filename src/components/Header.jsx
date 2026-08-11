import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-[#18181B] text-white p-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <img src="src\assets\logo-mark.png" alt="Logo" className="h-10 w-10" />
                <span>
                    <p className='text-[#F4F4F5] text-lg font-semibold'>CodeExpert AI</p>
                    <p className="text-xs text-[#717680] mb-1">Understand. Fix.</p>
                </span>
            </div>
            <div className='flex items-center gap-4'>
                <Link to="/" className="text-sm text-[#A1A1AA] hover:text-[#8B5CF6] hover:border border-[#4921a8] hover:bg-[#564089] cursor-pointer px-3 py-1 rounded-sm">Debug</Link>
                <Link to="/history" className="text-sm text-[#A1A1AA] hover:text-[#8B5CF6] hover:border border-[#4921a8] hover:bg-[#564089] cursor-pointer px-3 py-1 rounded-sm">History</Link>
                <Link to="/saved" className="text-sm text-[#A1A1AA] hover:text-[#8B5CF6] hover:border border-[#4921a8] hover:bg-[#564089] cursor-pointer px-3 py-1 rounded-sm">Saved</Link>
            </div>
            <div className='flex items-center gap-4'>
                <img src="src\assets\icon-btn-docs.png" alt="User" className="h-9 w-9 rounded-lg border border-[#A1A1AA] cursor-pointer" />
                <img src="src\assets\icon-btn-theme.png" alt="User" className="h-9 w-9 rounded-lg border border-[#A1A1AA] cursor-pointer" />
            </div>
        </div>
    </div>
  )
}
