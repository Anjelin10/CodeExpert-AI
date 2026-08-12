import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoMark from '../assets/logo-mark.png'
import docsIcon from '../assets/icon-btn-docs.png'
import { FaUser } from 'react-icons/fa'
import { FiMenu, FiX, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'

export default function Header() {
const navigate = useNavigate();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=' text-white p-4 sticky top-0 z-50 border-b border-white/10 bg-[#09090c]/95 backdrop-blur-xl'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <button 
                  className="md:hidden text-gray-400 hover:text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <div className='flex items-center gap-2'>
                    <img src={logoMark} alt="Logo" className="h-10 w-10" />
                    <span className="hidden sm:block">
                        <span className="text-base font-semibold tracking-tight">
                            Code<span className="text-purple-500/90">Expert</span>
                        </span>
                        <p className="text-xs text-[#717680] mb-1">Understand. Fix.</p>
                    </span>
                </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-2'>
                <NavLink to="/" className={({isActive}) => `text-sm px-4 py-1.5 rounded-md transition-colors ${isActive ? 'bg-purple-500/60 text-white font-medium' : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]'}`}>Debug</NavLink>
                <NavLink to="/history" className={({isActive}) => `text-sm px-4 py-1.5 rounded-md transition-colors ${isActive ? 'bg-purple-500/60 text-white font-medium' : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]'}`}>History</NavLink>
                <NavLink to="/saved" className={({isActive}) => `text-sm px-4 py-1.5 rounded-md transition-colors ${isActive ? 'bg-purple-500/60 text-white font-medium' : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]'}`}>Saved</NavLink>
            </div>
            
            <div className='flex items-center gap-3 md:gap-5'>
                <Link to="/documentation" className="hidden sm:block">
                    <img src={docsIcon} alt="User" className="h-9 w-9 rounded-lg cursor-pointer" />
                </Link>
                <div className="relative">
                    <FaUser 
                        size={20} 
                        className='text-purple-500/80 cursor-pointer' 
                        onClick={() => {
                            if (isLoggedIn) {
                                setShowDropdown(!showDropdown);
                            } else {
                                navigate('/login');
                            }
                        }}
                    />
                    
                    {isLoggedIn && showDropdown && (
                        <div className="absolute right-0 top-8 mt-3 w-48 bg-[#151515] border border-[#27272A] rounded-xl p-1.5 shadow-2xl z-50 flex flex-col">
                            <button className="flex items-center cursor-pointer gap-3 px-3 py-2.5 text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-[#F4F4F5] rounded-lg transition-colors text-left w-full">
                                <FiUser size={16} />
                                Profile
                            </button>
                            <button className="flex items-center cursor-pointer gap-3 px-3 py-2.5 text-sm text-[#F4F4F5] hover:bg-[#27272A] rounded-lg transition-colors text-left w-full my-0.5">
                                <FiSettings size={16} className="text-[#A78BFA]" />
                                Settings
                            </button>
                            
                            <div className="h-px bg-[#27272A] my-1 mx-1"></div>
                            
                            <button 
                                className="flex items-center cursor-pointer gap-3 px-3 py-2.5 text-sm text-[#EF4444] hover:bg-[#7F1D1D]/20 rounded-lg transition-colors text-left w-full"
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    setShowDropdown(false);
                                    navigate('/login');
                                }}
                            >
                                <FiLogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-4 flex flex-col gap-2">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `text-sm px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-[#564089] text-white font-medium' : 'text-[#A1A1AA] hover:bg-[#27272A] hover:text-white'}`}>Debug</NavLink>
                <NavLink to="/history" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `text-sm px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-[#564089] text-white font-medium' : 'text-[#A1A1AA] hover:bg-[#27272A] hover:text-white'}`}>History</NavLink>
                <NavLink to="/saved" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `text-sm px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-[#564089] text-white font-medium' : 'text-[#A1A1AA] hover:bg-[#27272A] hover:text-white'}`}>Saved</NavLink>
                <NavLink to="/documentation" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `text-sm px-3 py-2 rounded-md sm:hidden transition-colors ${isActive ? 'bg-[#564089] text-white font-medium' : 'text-[#A1A1AA] hover:bg-[#27272A] hover:text-white'}`}>Documentation</NavLink>
            </div>
        )}
    </div>
  )
}
