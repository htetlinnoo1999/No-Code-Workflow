import { NodeType } from '@/constant'
import { NodeData, NodeDataType } from '@/store/builderStore'
import { useExecutionLogStore } from '@/store/executionLogStore'
import useToastStore from '@/store/toastStore'
import { Node } from 'reactflow'

export const useExecutionFlow = () => {
  const { setToast } = useToastStore()
  const addLog = useExecutionLogStore((state) => state.addExecutionLog)

  const validateCalculationNodes = (
    nodes: Node[],
    nodeData: NodeData
  ): boolean => {
    for (const node of nodes) {
      if (node.type === 'CALCULATION_NODE') {
        const calculationData = nodeData[node.id] as NodeDataType['calculation']
        const { num1, num2 } = calculationData

        console.log(typeof num1, typeof num2)
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
        const firstNumber = parseInt(num1 as string)
        const secondNumber = parseInt(num2 as string)
        let result
        // can convert to number at this point because it's already validated and throw an error.
        switch (operation) {
          case 'add':
            result = firstNumber + secondNumber
            break
          case 'subtract':
            result = firstNumber - secondNumber
            break
          case 'multiply':
            result = firstNumber * secondNumber
            break
          case 'divide':
            result =
              secondNumber !== 0
                ? firstNumber / secondNumber
                : 'Error: Division by zero'
            break
          default:
            result = 'Invalid operation'
        }
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
      const isValid = validateCalculationNodes(nodes, nodeData)
      if (!isValid) {
        addLog({
          id: crypto.randomUUID(),
          executedAt: new Date().toISOString(),
          status: 'failure',
          message: `Workflow execution failed: one of calculation nodes has error.`,
        })
        return
      }
      for (const node of nodes) {
        if (node.type === NodeType.CALCULATION_NODE)
          console.log(`Executing Node: ${node.id} (${node.type})`)
        await simulateNodeAction(node, nodeData)
      }
      addLog({
        id: crypto.randomUUID(),
        executedAt: new Date().toISOString(),
        status: 'success',
        message: `Workflow executed successfully with ${nodes.length} steps.`,
      })
      setToast({ title: 'Workflow executed successfully.', type: 'success' })
    })()
  }
  return { executeWorkflow, simulateNodeAction }
}
