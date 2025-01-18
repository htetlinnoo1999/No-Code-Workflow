import { NodeType } from '@/constant'
import { getDefaultNodeData } from '@/lib/util'
import { it, expect, describe } from 'vitest'

describe('Test to check getDefaultNodeData function', () => {
  it('should return default email node data for EMAIL_NODE', () => {
    const result = getDefaultNodeData(NodeType.EMAIL_NODE)
    expect(result).toEqual({ recipient: '', subject: '', body: '' })
  })

  it('should return default calculation node data for CALCULATION_NODE', () => {
    const result = getDefaultNodeData(NodeType.CALCULATION_NODE)
    expect(result).toEqual({ num1: '', num2: '', operation: 'add' })
  })

  it('should return default log node data for unknown or LOG_NODE', () => {
    const result = getDefaultNodeData(NodeType.LOG_NODE)
    expect(result).toEqual({ message: '' })
  })
})
