import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

return (
  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
        🔎 Search Results <span className="text-indigo-600">({allJobs.length})</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Job job={job} />
          </div>
        ))}
      </div>
    </div>
  </div>
);


}

export default Browse