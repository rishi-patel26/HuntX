import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto from-slate-50 via-blue-50 to-indigo-100 rounded-2xl shadow-lg my-6 p-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 ring-2 ring-blue-400">
                            <AvatarImage
                                src={
                                    user?.profile?.profilePhoto ||
                                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                }
                                alt="profile"
                            />
                        </Avatar>

                        <div>
                            <h1 className="text-2xl font-bold text-black">{user?.fullname}</h1>
                            <p className="text-gray-600 mt-1">{user?.profile?.bio || "No bio available."}</p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)} variant="outline" className="hover:bg-blue-50 border-blue-300">
                        <Pen className="w-4 h-4 mr-2" /> Edit
                    </Button>
                </div>

                <div className="mt-6 space-y-3 text-black">
                    <div className="flex items-center gap-3">
                        <Mail className="text-blue-500" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="text-blue-500" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-md font-semibold text-black mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => (
                                <Badge
                                    key={index}
                                    className="bg-blue-100 text-blue-800 border border-blue-200 rounded-full px-3 py-1 text-sm"
                                >
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-black">NA</span>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <Label className="text-md font-bold text-black">Resume</Label>
                    <div className="mt-1">
                        {isResume ? (
                            <a
                                target="_blank"
                                href={user?.profile?.resume}
                                className="text-blue-500 hover:underline break-all"
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-blue-500">NA</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-md p-6 mt-8">
                <h1 className="text-lg font-bold text-blackmb-4">📌 Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );

}

export default Profile