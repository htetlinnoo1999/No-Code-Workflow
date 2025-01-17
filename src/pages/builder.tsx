import CalculationNode from '@/components/builder/calculationNode'
import { EmailNode } from '@/components/builder/emailNode'
import { BuilderHeaderAction } from '@/components/builder/headerAction'
import LogMessageNode from '@/components/builder/messageNode'
import { NodeType } from '@/constant'
import { useExecutionFlow } from '@/hooks/useExecutionFlow'
import { useBuilderStore } from '@/store/builderStore'
import { IconLocation } from '@tabler/icons-react'
import { useCallback } from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  EdgeChange,
  NodeChange,
} from 'reactflow'

const nodeTypes = {
  [NodeType.EMAIL_NODE]: EmailNode,
  [NodeType.LOG_NODE]: LogMessageNode,
  [NodeType.CALCULATION_NODE]: CalculationNode,
}

export const BuilderPage = () => {
  const { nodes, edges, setNodes, setEdges, nodeData } = useBuilderStore()
  const { executeWorkflow } = useExecutionFlow()

  const handleNodeChange = useCallback(
    (changes: NodeChange[]) => {
      const nodeChanges = applyNodeChanges(changes, nodes)
      setNodes(nodeChanges)
    },
    [nodes, setNodes]
  )
  const handleEdgeChange = useCallback(
    (changes: EdgeChange[]) => {
      const edgeChanges = applyEdgeChanges(changes, edges)
      setEdges(edgeChanges)
    },
    [edges, setEdges]
  )

  const handleConnect = useCallback(
    (params: Edge | Connection) => {
      const connection = addEdge(params, edges)
      setEdges(connection)
    },
    [edges, setEdges]
  )

  return (
    <div className="w-screen h-screen p-6 flex flex-col gap-4">
      <div className="my-2">
        <p className="text-lg font-bold uppercase">Build you custom Workflow</p>
      </div>
      <BuilderHeaderAction />
      <div className="h-3/4 w-10/12 mx-auto bg-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodeChange}
          onEdgesChange={handleEdgeChange}
          onConnect={handleConnect}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="flex w-10/12 gap-3 mx-auto justify-end">
        <button
          onClick={() => executeWorkflow(nodes, nodeData)}
          type="button"
          className="flex gap-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <IconLocation />
          Execute Workflow
        </button>
      </div>
    </div>
  )
}
