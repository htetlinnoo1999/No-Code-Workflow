import { NodeData, NodeDataType } from '@/store/builderStore'
import { Node } from 'reactflow'

export const useExecutionFlow = () => {
  const simulateNodeAction = async (node: Node, nodeData: NodeData) => {
    switch (node.type) {
      case 'EMAIL_NODE': {
        const emailData = nodeData[node.id] as NodeDataType['email']
        console.log(`Sending Email to: ${emailData.recipient}`)
        console.log(`Subject: ${emailData.subject}`)
        console.log(`Body: ${emailData.body}`)
        break
      }

      case 'LOG_NODE': {
        const logData = nodeData[node.id] as NodeDataType['log']
        console.log(`Log Message: ${logData.message}`)
        break
      }

      case 'CALCULATION_NODE': {
        const calculationData = nodeData[node.id] as NodeDataType['calculation']
        const { num1, num2, operation } = calculationData
        const result =
          operation === 'add'
            ? num1 + num2
            : operation === 'multiply'
            ? num1 * num2
            : null
        console.log(`Calculation Result: ${result}`)
        break
      }

      default:
        console.log(`Unknown node type: ${node.type}`)
    }

    // Simulate delay for async execution
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const executeWorkflow = (nodes: Node[], nodeData: NodeData) => {
    ;(async () => {
      for (const node of nodes) {
        console.log(`Executing Node: ${node.id} (${node.type})`)
        await simulateNodeAction(node, nodeData)
      }
      console.log('Workflow Execution Completed!')
    })()
  }
  return { executeWorkflow }
}
