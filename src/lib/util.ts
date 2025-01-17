import { NodeType } from '@/constant'
import { NodeData } from '@/store/builderStore'

export const getDefaultNodeData = (
  nodeType: NodeType
): NodeData['calculation'] | NodeData['email'] | NodeData['log'] => {
  switch (nodeType) {
    case NodeType.EMAIL_NODE:
      return { recipient: '', subject: '', body: '' }
    case NodeType.CALCULATION_NODE:
      return { num1: 0, num2: 0, operation: 'add' }
    default:
      return { message: '' }
  }
}
