import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption className="text-left text-sm text-gray-500 mb-4">
                    A list of your recently registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage
                                        src={company.logo || "/default-logo.png"}
                                        alt={`${company.name} logo`}
                                        className="object-cover"
                                    />
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium text-slate-800">{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <button aria-label="More actions" className="p-2 hover:bg-gray-100 rounded-full">
                                            <MoreHorizontal />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 cursor-pointer text-indigo-600 hover:bg-indigo-50 rounded px-2 py-1"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}

export default CompaniesTable