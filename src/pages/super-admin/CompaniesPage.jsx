import { useEffect, useState } from "react"
import axiosInstance from "../../api/axios"

export default function CompaniesPage() {

    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)

    const loadCompanies = async () => {
        try {
            const res = await axiosInstance.get(
                "/super-admin/companies/"
            )

            setCompanies(res.data)

        } catch (err) {
            console.log(err)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCompanies()
    }, [])

    const approveCompany = async (id) => {
        try {
            await axiosInstance.patch(
                `/super-admin/companies/${id}/approve/`
            )

            loadCompanies()

        } catch (err) {
            console.log(err)
        }
    }

    const rejectCompany = async (id) => {
        try {
            await axiosInstance.patch(
                `/super-admin/companies/${id}/reject/`
            )

            loadCompanies()

        } catch (err) {
            console.log(err)
        }
    }

    if (loading) {
        return (
            <div className="p-8">
                Loading...
            </div>
        )
    }

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Companies
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Company
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Phone
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            companies.map(company => (

                                <tr
                                    key={company.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {company.name}
                                    </td>

                                    <td className="p-4">
                                        {company.email}
                                    </td>

                                    <td className="p-4">
                                        {company.phone}
                                    </td>

                                    <td className="p-4">

                                        {
                                            company.status === "pending" && (
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                                                    Pending
                                                </span>
                                            )
                                        }

                                        {
                                            company.status === "approved" && (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                                    Approved
                                                </span>
                                            )
                                        }

                                        {
                                            company.status === "rejected" && (
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                                    Rejected
                                                </span>
                                            )
                                        }

                                    </td>

                                    <td className="p-4 text-center">

                                        {
                                            company.status === "pending" && (

                                                <div className="flex justify-center gap-3">

                                                    <button
                                                        onClick={() =>
                                                            approveCompany(
                                                                company.id
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            rejectCompany(
                                                                company.id
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Reject
                                                    </button>

                                                </div>

                                            )
                                        }

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}