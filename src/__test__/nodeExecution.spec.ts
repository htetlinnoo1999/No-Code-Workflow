import { useExecutionFlow } from '@/hooks/useExecutionFlow'
import { NodeData } from '@/store/builderStore'
import { renderHook } from '@testing-library/react'
import { Node } from 'reactflow'
import { it, expect, describe, vi, afterEach, afterAll } from 'vitest'

const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {})
vi.useFakeTimers()

describe('Test to check simulateNodeAction working as expected or not', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should log email details for EMAIL_NODE', async () => {
    const { result } = renderHook(() => useExecutionFlow())
    const node: Node = {
      id: '1',
      type: 'EMAIL_NODE',
      position: { x: 0, y: 0 },
      data: {},
    }
    const nodeData: NodeData = {
      '1': {
        recipient: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
      },
    }

    const promise = result.current.simulateNodeAction(node, nodeData)

    // Fast forward the timer
    vi.runAllTimers()
    await promise

    expect(consoleLogMock).toHaveBeenCalledWith(
      'Sending Email to: test@example.com'
    )
    expect(consoleLogMock).toHaveBeenCalledWith('Subject: Test Subject')
    expect(consoleLogMock).toHaveBeenCalledWith('Body: Test Body')
  })

  it('should log message for LOG_NODE', async () => {
    const node: Node = {
      id: '2',
      type: 'LOG_NODE',
      position: { x: 0, y: 0 },
      data: {},
    }
    const nodeData: NodeData = { '2': { message: 'Test Log Message' } }
    const { result } = renderHook(() => useExecutionFlow())

    const promise = result.current.simulateNodeAction(node, nodeData)

    vi.runAllTimers()
    await promise

    expect(consoleLogMock).toHaveBeenCalledWith('Log Message: Test Log Message')
  })

  it('should log calculation result for CALCULATION_NODE with add operation', async () => {
    const node: Node = {
      id: '3',
      type: 'CALCULATION_NODE',
      position: { x: 0, y: 0 },
      data: {},
    }
    const nodeData: NodeData = {
      '3': { num1: '5', num2: '10', operation: 'add' },
    }
    const { result } = renderHook(() => useExecutionFlow())
    const promise = result.current.simulateNodeAction(node, nodeData)

    vi.runAllTimers()
    await promise

    expect(consoleLogMock).toHaveBeenCalledWith('Calculation Result: 15')
  })

  it('should handle division by zero for CALCULATION_NODE', async () => {
    const node: Node = {
      id: '4',
      type: 'CALCULATION_NODE',
      position: { x: 0, y: 0 },
      data: {},
    }
    const nodeData: NodeData = {
      '4': { num1: '5', num2: '0', operation: 'divide' },
    }
    const { result } = renderHook(() => useExecutionFlow())
    const promise = result.current.simulateNodeAction(node, nodeData)

    vi.runAllTimers()
    await promise

    expect(consoleLogMock).toHaveBeenCalledWith(
      'Calculation Result: Error: Division by zero'
    )
  })

  it('should log unknown node type for unsupported node type', async () => {
    const node: Node = {
      id: '5',
      type: 'UNKNOWN_NODE',
      position: { x: 0, y: 0 },
      data: {},
    }
    const nodeData: NodeData = {}

    const { result } = renderHook(() => useExecutionFlow())

    const promise = result.current.simulateNodeAction(node, nodeData)

    vi.runAllTimers()
    await promise

    expect(consoleLogMock).toHaveBeenCalledWith(
      'Unknown node type: UNKNOWN_NODE'
    )
  })
})
