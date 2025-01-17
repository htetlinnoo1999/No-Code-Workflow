import { NodeData, useBuilderStore } from '@/store/builderStore'
import { Handle, NodeProps, Position } from 'reactflow'

export const EmailNode: React.FC<NodeProps> = ({ isConnectable, id }) => {
  const { nodeData, updateEmailData } = useBuilderStore()
  const data = (nodeData[id] as NodeData['email']) ?? {
    body: '',
    recipient: '',
    subject: '',
  }

  return (
    <>
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        id="a"
      />
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Email Task</h3>
        <input
          type="email"
          value={data.recipient}
          onChange={(e) => updateEmailData(id, { recipient: e.target.value })}
          placeholder="Recipient"
          className="w-full mb-2 p-1 border"
        />
        <input
          type="text"
          value={data.subject}
          onChange={(e) => updateEmailData(id, { subject: e.target.value })}
          placeholder="Subject"
          className="w-full mb-2 p-1 border"
        />
        <textarea
          value={data.body}
          onChange={(e) => updateEmailData(id, { body: e.target.value })}
          placeholder="Body"
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
