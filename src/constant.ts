export const DEFAULT_EMAIL_NODE = () => ({
  id: crypto.randomUUID(),
  type: NodeType.EMAIL_NODE,
  position: { x: 100, y: 100 },
  data: {},
})

export const DEFAULT_LOG_NODE = () => ({
  id: crypto.randomUUID(),
  type: NodeType.LOG_NODE,
  position: { x: 500, y: 100 },
  data: {},
})

export const DEFAULT_CALCULATION_NODE = () => ({
  id: crypto.randomUUID(),
  type: NodeType.CALCULATION_NODE,
  position: { x: 300, y: 100 },
  data: {},
})

export enum NodeType {
  EMAIL_NODE = 'EMAIL_NODE',
  LOG_NODE = 'LOG_NODE',
  CALCULATION_NODE = 'CALCULATION_NODE',
}
