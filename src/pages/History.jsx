import React from 'react'
import Header from '../components/Header'

export default function History() {
  return (
    <div>
    <Header/>
        <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] pb-10">
            <main className='px-4 py-5 md:px-6 lg:px-8'>
                 <div className="mb-5">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">Debug History</h1>
                    <p className="mt-1.5 text-xs text-[#A1A1AA]">Review and view logs from previous debugging queries.</p>
                </div>
            </main>
        </div>
    </div>
  )
}
