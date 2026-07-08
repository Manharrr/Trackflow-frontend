import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

export default function SuperAdminDashboard() {

    const navigate =
        useNavigate();

    const [dashboard,
        setDashboard
    ] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard =
        async () => {

            try {

                const res =
                    await axiosInstance.get(
                        "/super-admin/dashboard/"
                    );

                setDashboard(
                    res.data
                );

            }

            catch (err) {

                console.log(err);

            }

        };

    if (!dashboard) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Dashboard

                </h1>

                <p className="text-gray-500">

                    Welcome back Super Admin.

                </p>

            </div>

            <div className="grid grid-cols-4 gap-5">

                <Card
                    title="Total Companies"
                    value={dashboard.summary.total}
                />

                <Card
                    title="Pending"
                    value={dashboard.summary.pending}
                />

                <Card
                    title="Approved"
                    value={dashboard.summary.approved}
                />

                <Card
                    title="Rejected"
                    value={dashboard.summary.rejected}
                />

            </div>

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-semibold">

                        Recent Company Requests

                    </h2>

                    <button

                        onClick={() =>
                            navigate(
                                "/super-admin/companies"
                            )
                        }

                        className="text-blue-600"

                    >

                        View All

                    </button>

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-3">

                                Company

                            </th>

                            <th className="text-left p-3">

                                Status

                            </th>

                            <th className="text-center p-3">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            dashboard.recent.map(

                                company => (

                                    <tr
                                        key={company.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">

                                            {company.name}

                                        </td>

                                        <td className="p-3">

                                            {company.status}

                                        </td>

                                        <td className="text-center">

                                            <button

                                                onClick={() =>
                                                    navigate(
                                                        `/super-admin/companies/${company.id}`
                                                    )
                                                }

                                                className="bg-blue-600 text-white px-4 py-2 rounded"

                                            >

                                                View

                                            </button>

                                        </td>

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

function Card({
    title,
    value,
}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-3xl font-bold mt-2">

                {value}

            </h2>

        </div>

    );

}