import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
return (
  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
    {/* Decorative background blobs */}
    <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
    <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
    <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>

    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-12">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center text-slate-500 font-semibold text-xl">
            No Job Available
          </div>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  </div>
);

}

export default LatestJobs