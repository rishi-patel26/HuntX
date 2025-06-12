import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

return (
    <div className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,rgba(255,255,255,0.4))] -z-10"></div>
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl -z-10"></div>

        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 text-blue-700 font-medium text-sm mb-6 shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
                Popular Categories
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                Explore Job Categories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover opportunities across various industries and find the perfect match for your skills
            </p>
        </div>

        {/* Enhanced Carousel */}
        <div className="max-w-6xl mx-auto px-6">
            <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem
                                key={cat}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="group relative">
                                    <Button
                                        onClick={() => searchJobHandler(cat)}
                                        variant="outline"
                                        className="w-full h-16 rounded-2xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105 text-slate-700 font-semibold text-base"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Dynamic icon based on category */}
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-white/20 group-hover:to-white/20 flex items-center justify-center transition-all duration-300">
                                                {index % 4 === 0 && (
                                                    <svg className="w-4 h-4 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm6-1a1 1 0 00-2 0v1h2V5zM6 8a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                                    </svg>
                                                )}
                                                {index % 4 === 1 && (
                                                    <svg className="w-4 h-4 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                )}
                                                {index % 4 === 2 && (
                                                    <svg className="w-4 h-4 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                                    </svg>
                                                )}
                                                {index % 4 === 3 && (
                                                    <svg className="w-4 h-4 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="truncate">{cat}</span>
                                        </div>
                                        
                                        {/* Hover effect overlay */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300"></div>
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                
                {/* Enhanced Navigation Buttons */}
                <CarouselPrevious className="left-0 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12" />
                <CarouselNext className="right-0 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12" />
            </Carousel>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-150"></div>
            </div>
        </div>
    </div>
)
}

export default CategoryCarousel