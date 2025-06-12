import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header and Filter */}
        <div className="flex items-center justify-between mb-6">
          <Input
            className="w-64 bg-white text-slate-800 border border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
            placeholder="🔍 Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
          >
            + New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h1 className="text-xl font-bold text-slate-800 mb-4">📋 All Job Listings</h1>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );


}

export default AdminJobs