import { NodeDataType, useBuilderStore } from '@/store/builderStore'
import { Handle, NodeProps, Position } from 'reactflow'

const LogMessageNode: React.FC<NodeProps> = ({ id, isConnectable }) => {
  const { nodeData, updateLogData } = useBuilderStore()
  const data = (nodeData[id] as NodeDataType['log']) ?? {
    message: '',
  }
  return (
    <>
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        id="a"
      />
      <div className="bg-yellow-50 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Log Message Task</h3>
        <textarea
          value={data.message}
          onChange={(e) => updateLogData(id, { message: e.target.value })}
          placeholder="Log Message"
          className="w-full p-1 border"
        />
      </div>
      <Handle
        type="target"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="b"
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="c"
      />

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        id="d"
      />
    </>
  )
}

export default LogMessageNode
