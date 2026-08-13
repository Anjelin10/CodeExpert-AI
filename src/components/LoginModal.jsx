import React from 'react';
import { IoLogIn } from 'react-icons/io5';

export default function LoginModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-[#27272A] bg-[#18181B] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4 mb-2">
            <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded bg-[#8B5CF6]/20 flex items-center justify-center">
                    <IoLogIn className="text-[#8B5CF6]" size={18} />
                </div>
            </div>
            <div>
                <h3 className="text-[17px] font-semibold text-[#F4F4F5]">Authentication Required</h3>
            </div>
        </div>
        <div className="pl-12">
            <p className="text-sm text-[#A1A1AA] leading-relaxed pr-2">
                Please login to your CodeExpert-AI account to analyze and debug your code.
            </p>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#3F3F46] bg-transparent px-5 py-2 text-sm font-medium text-[#D4D4D8] transition-colors hover:bg-[#27272A] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-[#8B5CF6] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7C3AED] cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
