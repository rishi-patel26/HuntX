import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">🏢 Your Company Name</h1>
                        <p className="text-slate-500 mt-2">
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className="mb-6">
                        <Label className="text-slate-700 font-medium">Company Name</Label>
                        <Input
                            type="text"
                            className="mt-2 bg-white text-slate-800 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
                            placeholder="e.g. JobHunt, Microsoft"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/admin/companies")}
                            className="border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={registerNewCompany}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CompanyCreate