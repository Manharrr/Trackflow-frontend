import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'

export default function CompaniesPage() {
  const [companies,
    setCompanies
  ] = useState([])

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies =
    async () => {
      try {
        const res =
          await axiosInstance.get(
            '/admin/companies/'
          )

        setCompanies(
          res.data
        )
      } catch (
        error
      ) {
        console.log(error)
      }
    }

  const approveCompany =
    async (id) => {
      try {
        await axiosInstance.post(
          `/admin/companies/${id}/approve/`
        )

        fetchCompanies()
      } catch (
        error
      ) {
        console.log(error)
      }
    }

  const rejectCompany =
    async (id) => {
      try {
        await axiosInstance.post(
          `/admin/companies/${id}/reject/`
        )

        fetchCompanies()
      } catch (
        error
      ) {
        console.log(error)
      }
    }

  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Companies
      </h1>

      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
        "
      >
        <table
          className="
            w-full
          "
        >
          <thead>
            <tr
              className="
                border-b
              "
            >
              <th className="p-5 text-left">
                Company
              </th>

              <th className="p-5 text-left">
                Subdomain
              </th>

              <th className="p-5 text-left">
                Phone
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {companies.map(
              (
                company
              ) => (
                <tr
                  key={
                    company.id
                  }
                  className="
                    border-b
                  "
                >
                  <td className="p-5">
                    {
                      company.name
                    }
                  </td>

                  <td className="p-5">
                    {
                      company.schema_name
                    }
                  </td>

                  <td className="p-5">
                    {
                      company.phone
                    }
                  </td>

                  <td className="p-5">
                    {
                      company.status
                    }
                  </td>

                  <td className="p-5 space-x-3">
                    <button
                      onClick={() =>
                        approveCompany(
                          company.id
                        )
                      }
                      className="
                        bg-emerald-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectCompany(
                          company.id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}