import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

export default function CompaniesPage() {

    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("all");

    const loadCompanies = async () => {

        try {

            const res =
                await axiosInstance.get(
                    "/super-admin/companies/"
                );

            setCompanies(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCompanies();

    }, []);

    const approveCompany = async (id) => {

        try {

            await axiosInstance.patch(
                `/super-admin/companies/${id}/approve/`
            );

            loadCompanies();

        }

        catch (err) {

            console.log(err);

        }

    };

    const rejectCompany = async (id) => {

        const reason =
            prompt(
                "Reason for rejection"
            );

        if (!reason) return;

        try {

            await axiosInstance.patch(
                `/super-admin/companies/${id}/reject/`,
                {
                    reason,
                }
            );

            loadCompanies();

        }

        catch (err) {

            console.log(err);

        }

    };

    const filteredCompanies = useMemo(() => {

        return companies.filter((company) => {

            const matchesSearch =
                company.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                company.email
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                company.schema_name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                status === "all"
                    ? true
                    : company.status === status;

            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        companies,
        search,
        status,
    ]);

    const totalCompanies =
        companies.length;

    const pendingCompanies =
        companies.filter(
            c => c.status === "pending"
        ).length;

    const approvedCompanies =
        companies.filter(
            c => c.status === "approved"
        ).length;

    const rejectedCompanies =
        companies.filter(
            c => c.status === "rejected"
        ).length;

    if (loading) {

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

                    Companies

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage all registered workspaces.

                </p>

            </div>

            <div className="grid grid-cols-4 gap-5">

                <div className="bg-white rounded-xl p-6 shadow">

                    <p className="text-gray-500">

                        Total Companies

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {totalCompanies}

                    </h2>

                </div>

                <div className="bg-yellow-50 rounded-xl p-6 shadow">

                    <p>

                        Pending

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {pendingCompanies}

                    </h2>

                </div>

                <div className="bg-green-50 rounded-xl p-6 shadow">

                    <p>

                        Approved

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {approvedCompanies}

                    </h2>

                </div>

                <div className="bg-red-50 rounded-xl p-6 shadow">

                    <p>

                        Rejected

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {rejectedCompanies}

                    </h2>

                </div>

            </div>

            <div className="flex justify-between gap-4">

                <input

                    type="text"

                    placeholder="Search company..."

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="border rounded-lg px-4 py-2 w-full"

                />

                <select

                    value={status}

                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }

                    className="border rounded-lg px-4 py-2"

                >

                    <option value="all">

                        All

                    </option>

                    <option value="pending">

                        Pending

                    </option>

                    <option value="approved">

                        Approved

                    </option>

                    <option value="rejected">

                        Rejected

                    </option>

                </select>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

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

                                Subdomain

                            </th>

                            <th className="p-4 text-left">

                                Status

                            </th>

                            <th className="p-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredCompanies.map(

                                (company) => (

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

                                            {company.schema_name}

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium
                                                ${
                                                    company.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : company.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >

                                                {company.status}

                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="flex justify-center gap-2">

                                                <button

                                                    onClick={() =>
                                                        navigate(
                                                            `/super-admin/companies/${company.id}`
                                                        )
                                                    }

                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"

                                                >

                                                    View

                                                </button>

                                                {

                                                    company.status === "pending" && (

                                                        <>

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

                                                        </>

                                                    )

                                                }

                                            </div>

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
