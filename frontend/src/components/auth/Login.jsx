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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-8'>
            <form onSubmit={submitHandler} className='w-full max-w-md bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 my-10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden'>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F83002]/10 to-[#6A38C2]/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6A38C2]/10 to-[#F83002]/10 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                    <h1 className='font-bold text-3xl mb-8 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                        Welcome Back
                    </h1>
                    
                    <div className='my-6 space-y-2'>
                        <Label className="text-gray-700 font-semibold text-sm">Email Address</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#F83002] focus:ring-4 focus:ring-[#F83002]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-gray-300"
                        />
                    </div>
                     
                    <div className='my-6 space-y-2'>
                        <Label className="text-gray-700 font-semibold text-sm">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#F83002] focus:ring-4 focus:ring-[#F83002]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-gray-300"
                        />
                    </div>
                    
                    <div className='flex items-center justify-center my-8'>
                        <RadioGroup className="flex items-center gap-8">
                            <div className="flex items-center space-x-3 group">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4 text-[#F83002] border-2 border-gray-300 focus:ring-[#F83002] focus:ring-2"
                                />
                                <Label htmlFor="r1" className="cursor-pointer text-gray-700 font-medium group-hover:text-[#F83002] transition-colors duration-200">
                                    Student
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4 text-[#6A38C2] border-2 border-gray-300 focus:ring-[#6A38C2] focus:ring-2"
                                />
                                <Label htmlFor="r2" className="cursor-pointer text-gray-700 font-medium group-hover:text-[#6A38C2] transition-colors duration-200">
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    
                    {
                        loading ? 
                        <Button className="w-full my-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-not-allowed">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                            Please wait
                        </Button> : 
                        <Button type="submit" className="w-full my-6 py-3 bg-gradient-to-r from-[#2853ab] to-[#2052b5] hover:from-[#2052b5] hover:to-[#2853ab] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                            Sign In
                        </Button>
                    }
                    
                    <div className="text-center mt-6">
                        <span className='text-sm text-gray-600'>
                            Don't have an account? 
                            <Link to="/signup" className='text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline transition-colors'
                            >
                                Create Account
                            </Link>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    </div>
)
}

export default Login