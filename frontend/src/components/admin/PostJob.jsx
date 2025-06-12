import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center w-full px-4 py-10">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-4xl bg-white border border-slate-200 shadow-xl rounded-2xl p-8"
                >
                    <h1 className="text-2xl font-bold text-slate-800 mb-6">📝 Post a New Job</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-indigo-300"
                            />
                        </div>
                    </div>

                    {/* Company Select Dropdown */}
                    {companies.length > 0 && (
                        <div className="mt-6">
                            <Label className="mb-1 block">Select Company</Label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full sm:w-[300px] bg-white text-slate-800 border border-slate-300 focus:border-indigo-500 focus:ring-indigo-300">
                                    <SelectValue placeholder="Choose a company..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem
                                                key={company._id || company.name}
                                                value={company.name?.toLowerCase()}
                                            >
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Buttons */}
                    {loading ? (
                        <Button className="w-full mt-8 bg-indigo-500 text-white">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
                        >
                            🚀 Post New Job
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-center text-sm text-red-600 font-medium mt-4">
                            * Please register a company first before posting a job.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );


}

export default PostJob