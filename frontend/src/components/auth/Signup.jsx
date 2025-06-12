import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-8'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 my-10 border border-slate-200/50 backdrop-blur-sm'
                >
                    <div className="text-center mb-8">
                        <h1 className='font-bold text-3xl text-slate-800 mb-2'>Create Account</h1>
                        <p className="text-slate-600 text-sm">Join our community today</p>
                    </div>

                    <div className='mb-6'>
                        <Label className="text-slate-700 font-medium text-sm mb-2 block">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50/50 hover:bg-white"
                        />
                    </div>

                    <div className='mb-6'>
                        <Label className="text-slate-700 font-medium text-sm mb-2 block">Email Address</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50/50 hover:bg-white"
                        />
                    </div>

                    <div className='mb-6'>
                        <Label className="text-slate-700 font-medium text-sm mb-2 block">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="(6789) 123-456"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50/50 hover:bg-white"
                        />
                    </div>

                    <div className='mb-6'>
                        <Label className="text-slate-700 font-medium text-sm mb-2 block">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a strong password"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50/50 hover:bg-white"
                        />
                    </div>

                    <div className='mb-6'>
                        <Label className="text-slate-700 font-medium text-sm mb-3 block">I am a:</Label>
                        <RadioGroup className="flex gap-6">
                            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-200">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                />
                                <Label htmlFor="r1" className="cursor-pointer text-slate-700 font-medium">Student</Label>
                            </div>
                            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-200">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                />
                                <Label htmlFor="r2" className="cursor-pointer text-slate-700 font-medium">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className='mb-8'>
                        <Label className="text-slate-700 font-medium text-sm mb-2 block">Profile Picture</Label>
                        <div className="relative">
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className=" px-0 py-0 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors bg-slate-50/50 hover:bg-blue-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <Loader2 className='mr-2 h-2 w-2 animate-spin' />
                            Creating Account...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full py-1 bg-gradient-to-r from-[#2853ab] to-[#2052b5] hover:from-[#2052b5] hover:to-[#2853ab] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Create Account
                        </Button>
                    )}

                    <div className="text-center mt-6 pt-6 border-t border-slate-200">
                        <span className='text-slate-600 text-sm'>
                            Already have an account?
                            <Link
                                to="/login"
                                className='text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline transition-colors'
                            >
                                Sign In
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup