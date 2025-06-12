import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="sm:max-w-[500px] bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl px-6 py-5"
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-800">📝 Update Profile</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-5 py-4">
                            {/* Full Name */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right text-slate-700 font-medium">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-slate-800 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Email */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right text-slate-700 font-medium">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-slate-800 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Number */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="text-right text-slate-700 font-medium">Number</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-slate-800 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Bio */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right text-slate-700 font-medium">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-slate-800 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Skills */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right text-slate-700 font-medium">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-slate-800 border-slate-300 focus:border-indigo-500 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Resume Upload */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right text-slate-700 font-medium">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span-3 bg-white text-slate-800 file:text-indigo-600 file:font-medium"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4 bg-indigo-500 text-white hover:bg-indigo-600">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full my-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                                >
                                    Update
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );

}

export default UpdateProfileDialog