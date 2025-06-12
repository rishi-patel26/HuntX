import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

return (
  <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
    <Navbar />
    <div className="max-w-7xl mx-auto mt-8 px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg p-4">
            <FilterCard />
          </div>
        </div>
        
        {filterJobs.length <= 0 ? (
          <div className="flex-1 text-center text-slate-500 font-medium text-lg pt-10">
            Job not found
          </div>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default Jobs