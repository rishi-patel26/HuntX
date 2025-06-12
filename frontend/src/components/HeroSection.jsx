import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

return (
    <div className='text-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20'>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>

        <div className='flex flex-col gap-8 my-16 max-w-6xl mx-auto px-6'>
            {/* Badge */}
            <div className="flex justify-center">
                <span className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 text-blue-700 font-semibold text-sm shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                    #1 Job Hunt Platform
                </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
                <h1 className='text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent'>
                    Search, Apply & <br /> 
                    Get Your <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Dream Jobs</span>
                </h1>
                <p className='text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium'>
                    Discover thousands of opportunities and connect with top employers. 
                    Your next career milestone is just one search away.
                </p>
            </div>

            {/* Search Bar */}
            <div className='flex justify-center mt-12'>
                <div className='flex w-full max-w-2xl shadow-2xl border-2 border-white/50 rounded-2xl items-center gap-2 mx-auto bg-white/80 backdrop-blur-md hover:shadow-3xl transition-all duration-300 p-2'>
                    <div className="flex-1 flex items-center pl-6">
                        <Search className='h-5 w-5 text-slate-400 mr-3' />
                        <input
                            type="text"
                            placeholder='Search for jobs, companies, or skills...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full text-slate-700 placeholder-slate-400 text-lg py-4 bg-transparent'
                        />
                    </div>
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        <Search className='h-5 w-5 mr-2' />
                        Search Jobs
                    </Button>
                </div>
            </div>

            {/* Stats or additional info */}
            <div className="flex justify-center items-center gap-8 mt-12 text-slate-600">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <span className="font-medium">10K+ Active Jobs</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                    </div>
                    <span className="font-medium">500K+ Job Seekers</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <span className="font-medium">1K+ Companies</span>
                </div>
            </div>
        </div>
    </div>
)
}

export default HeroSection