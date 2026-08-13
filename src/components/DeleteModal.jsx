import React from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';

export default function DeleteModal({ isOpen, onClose, onConfirm, title = "Delete debugging session?", message = "This action cannot be undone. This session will be permanently deleted from your history." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-[#27272A] bg-[#18181B] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4 mb-2">
            <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-7 rounded bg-[#ef4444] flex items-center justify-center">
                    <RiDeleteBinFill className="text-white/90" size={14} />
                </div>
            </div>
            <div>
                <h3 className="text-[17px] font-semibold text-[#F4F4F5]">{title}</h3>
            </div>
        </div>
        <div className="pl-10">
            <p className="text-sm text-[#A1A1AA] leading-relaxed pr-2">
                {message}
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
            className="rounded-lg bg-[#ef4444] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#dc2626] cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
