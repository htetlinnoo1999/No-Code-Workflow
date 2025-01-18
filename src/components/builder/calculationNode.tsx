import { NodeDataType, useBuilderStore } from '@/store/builderStore'
import { Handle, NodeProps, Position } from 'reactflow'

const CalculationNode: React.FC<NodeProps> = ({ isConnectable, id }) => {
  const { nodeData, updateCalculationData } = useBuilderStore()
  const data = (nodeData[id] as NodeDataType['calculation']) ?? {
    num1: '',
    num2: '',
    operation: 'add',
  }
  return (
    <>
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        id="a"
      />
      <div className="bg-blue-50 p-4 rounded-lg shadow">
        <h3>Calculation Task</h3>
        <input
          type="number"
          placeholder="Number 1"
          value={data.num1}
          onChange={(e) =>
            updateCalculationData(id, { num1: Number(e.target.value) })
          }
          className="w-full p-2 border"
        />
        <input
          type="number"
          placeholder="Number 2"
          value={data.num2}
          onChange={(e) =>
            updateCalculationData(id, { num2: Number(e.target.value) })
          }
          className="w-full p-2 border mt-2"
        />
        <select
          value={data.operation}
          onChange={(e) =>
            updateCalculationData(id, {
              operation: e.target.value as 'add' | 'multiply',
            })
          }
          className="w-full p-2 border mt-2"
        >
          <option value="add">Add</option>
          <option value="multiply">Multiply</option>
          <option value="subtract">Subtract</option>
          <option value="divide">Divide</option>
        </select>
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

export default CalculationNode
