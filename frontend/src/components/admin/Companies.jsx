import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4">
                <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-xl shadow-md">
                    <Input
                        className="w-1/3 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300 bg-white text-slate-800 placeholder:text-slate-400"
                        placeholder="🔍 Filter by company name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow"
                    >
                        ➕ New Company
                    </Button>
                </div>

                <div className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );


}

export default Companies