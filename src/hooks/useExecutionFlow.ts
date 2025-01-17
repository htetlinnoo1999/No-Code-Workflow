import { NodeType } from '@/constant'
import { NodeData, NodeDataType } from '@/store/builderStore'
import useToastStore from '@/store/toastStore'
import { Node } from 'reactflow'

export const useExecutionFlow = () => {
  const { setToast } = useToastStore()

  const validateCalculationNodes = (nodes: Node[]): boolean => {
    for (const node of nodes) {
      if (node.type === 'CALCULATION_NODE') {
        const calculationData = node.data as NodeDataType['calculation']
        const { num1, num2 } = calculationData

        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
          setToast({
            title: `Calculation Node data is Invalid.`,
            type: 'error',
          })
          return false
        }
      }
    }
    return true
  }

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
        // can convert to number at this point because it's already validated and throw an error.
        const result =
          operation === 'add'
            ? parseInt(num1 as string) + parseInt(num2 as string)
            : operation === 'multiply'
            ? parseInt(num1 as string) * parseInt(num2 as string)
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
      const isValid = validateCalculationNodes(nodes)
      if (!isValid) return
      for (const node of nodes) {
        if (node.type === NodeType.CALCULATION_NODE)
          console.log(`Executing Node: ${node.id} (${node.type})`)
        await simulateNodeAction(node, nodeData)
      }
      console.log('Workflow Execution Completed!')
    })()
  }
  return { executeWorkflow }
}
