import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { AvatarFallback } from '@radix-ui/react-avatar'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-gradient-to-r from-white via-slate-50 to-white shadow-lg border-b border-gray-100'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <div>
                    <h1 className='text-3xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer'>
                        Hunt<span className='text-[#4d43d1] drop-shadow-sm'>X</span>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='text-gray-700 hover:text-[#F83002] hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-semibold border-b-2 border-transparent hover:border-[#F83002]'>
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='text-gray-700 hover:text-[#F83002] hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-semibold border-b-2 border-transparent hover:border-[#F83002]'>
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='text-gray-700 hover:text-[#F83002] hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-semibold border-b-2 border-transparent hover:border-[#F83002]'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className='text-gray-700 hover:text-[#F83002] hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-semibold border-b-2 border-transparent hover:border-[#F83002]'>
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='text-gray-700 hover:text-[#F83002] hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-semibold border-b-2 border-transparent hover:border-[#F83002]'>
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className='border-2 border-gray-300 text-gray-700 hover:border-[#F83002] hover:text-[#F83002] hover:bg-gray-50 transition-all duration-200 font-semibold px-6 py-2 rounded-full shadow-sm hover:shadow-md'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-to-r  from-slate-700 via-blue-700 to-indigo-700  text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#F83002] transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-4">
                                    <div className=''>
                                        <div className='flex gap-3 space-y-2'>
                                            <Avatar className="cursor-pointer ring-2 ring-gray-200 shadow-md">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                <AvatarFallback className='bg-gradient-to-br from-[#6A38C2] to-[#8B5FD6] text-white font-semibold'>
                                                    {user?.fullname?.[0]}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className='flex-1'>
                                                <h4 className='font-bold text-gray-800 text-lg'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600 mt-1 leading-relaxed'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-4 space-y-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 group'>
                                                        <User2 className='text-gray-500 group-hover:text-[#F83002] transition-colors duration-200' />
                                                        <Button variant="link" className='p-0 h-auto text-gray-700 group-hover:text-[#F83002] font-medium'>
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-3 cursor-pointer hover:bg-red-50 p-2 rounded-lg transition-colors duration-200 group'>
                                                <LogOut className='text-gray-500 group-hover:text-red-500 transition-colors duration-200' />
                                                <Button onClick={logoutHandler} variant="link" className='p-0 h-auto text-gray-700 group-hover:text-red-500 font-medium'>
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )

}

export default Navbar