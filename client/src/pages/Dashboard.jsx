import { Plus, Upload } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <h1>Dashboard page</h1>
        <div className='max-w-7xl mx-auto px-4 py-8'>
         <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>
         <div className='flex gap-4'>

          {/* create resume button */}
          <button className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer'><Plus className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-green-300 to-green-500 text-white rounded-full'/>
          <p>Create Resume</p></button>
          {/* create upload existing button */}

          <button className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'><Upload className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full'/>
          <p>Upload Existing </p></button>

         
         </div>

         <hr className='border-slate-300 my-6 sm:w-[305px]'/>

         

        </div>
    </div>
  )
}

export default Dashboard