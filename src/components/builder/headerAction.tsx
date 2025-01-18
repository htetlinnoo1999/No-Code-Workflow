import { useBuilderStore } from '@/store/builderStore'
import {
  IconCalculator,
  IconDownload,
  IconInfoSquareRounded,
  IconMail,
  IconMessage,
  IconReload,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export const BuilderHeaderAction = () => {
  const { nodes, edges, saveAsDefault, loadDefaultTemplate, addNode } =
    useBuilderStore()
  const navigate = useNavigate()

  return (
    <div className="flex w-10/12 gap-3 mx-auto justify-between">
      <button
        onClick={() => saveAsDefault(nodes, edges)}
        type="button"
        className="flex gap-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <IconDownload />
        Save as Default
      </button>

      <button
        onClick={() => loadDefaultTemplate()}
        type="button"
        className="flex gap-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <IconReload />
        Load Default Template
      </button>

      <button
        type="button"
        onClick={() => addNode('email')}
        className="flex gap-2 items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <IconMail />
        Add Email Node
      </button>

      <button
        type="button"
        onClick={() => addNode('calculation')}
        className="flex gap-2 items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <IconCalculator />
        Add Calculation Node
      </button>

      <button
        type="button"
        onClick={() => addNode('log')}
        className="flex gap-2 items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <IconMessage />
        Add Message Node
      </button>

      <button
        type="button"
        onClick={() => navigate('/execution-logs')}
        className="flex gap-2 items-center text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <IconInfoSquareRounded />
        Check Execution Log
      </button>
    </div>
  )
}
