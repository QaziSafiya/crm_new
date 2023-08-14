import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CloseCircleIcon from "../components/icons/CloseCircleIcon.jsx";
import ViewIcon from "../components/icons/ViewIcon.jsx";
import Pagination from "../components/Pagination.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import useUsers from "../hooks/useUsers.js";

export default function Users() {
  const [search, setSearch] = useSearchParams();
  const pageNo = search.get("page") || 0;
  const { users, loading, error, totalPages, currentPage } = useUsers(pageNo);

  useEffect(() => console.log(users), [loading]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary">Users</h6>
          {loading ? (
            <div className="flex jc-center ai-center">
              <span className="spinner medium"></span>
            </div>
          ) : error ? (
            <div className="error-message">
              <CloseCircleIcon />
              {error}
            </div>
          ) : (
            <>
              <table className="users-table w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="py-2 px-4 font-medium">First Name</th>
                    <th className="py-2 px-4 font-medium">Last Name</th>
                    <th className="py-2 px-4 font-medium">Email</th>
                    <th className="py-2 px-4 font-medium">Mobile No.</th>
                    <th className="py-2 px-4 font-medium">Pan No.</th>
                    <th className="py-2 px-4 font-medium">User Type</th>
                    <th className="py-2 px-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{user.firstName}</td>
                      <td className="py-2 px-4">{user.lastName}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.phone}</td>
                      <td className="py-2 px-4">{user.pan}</td>
                      <td className="py-2 px-4">{user.userType}</td>
                      <td className="py-2 px-4">
                        <Link
                          to={`/user/${user.id}`}
                          className="inline-block px-3 py-1 text-blue-500 hover:underline"
                        >
                          <ViewIcon className="mr-1 h-4 w-4 inline" />
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setSearch={setSearch}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
