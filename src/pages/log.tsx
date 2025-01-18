import { useExecutionLogStore } from '@/store/executionLogStore'
import { FC, useState } from 'react'

export const LogPage: FC = () => {
  const logs = useExecutionLogStore((state) => state.logs)
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 5

  const sortedLogs = logs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime()
    )
  // Pagination Logic
  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog)

  const totalPages = Math.ceil(sortedLogs.length / logsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="w-screen h-screen p-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Executed At
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.length > 0 ? (
            currentLogs.map((log) => (
              <tr
                key={log.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {log.executedAt}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {log.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">{log.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-center text-gray-500 font-bold"
              >
                There's no Execution Logs yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-800'
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-800'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
