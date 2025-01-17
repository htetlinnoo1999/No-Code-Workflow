import { Edge, Node } from 'reactflow'
import { create } from 'zustand'
import useToastStore from './toastStore'
import {
  DEFAULT_CALCULATION_NODE,
  DEFAULT_EMAIL_NODE,
  DEFAULT_LOG_NODE,
} from '@/constant'
import { getDefaultNodeData } from '@/lib/util'

export type NodeDataType = {
  email: { recipient: string; subject: string; body: string }
  log: { message: string }
  calculation: {
    num1: number | string
    num2: number | string
    operation: 'add' | 'multiply'
  }
}

export type NodeData = {
  [k: string]:
    | NodeDataType['email']
    | NodeDataType['calculation']
    | NodeDataType['log']
}

type BuilderState = {
  defaultTemplate: { nodes: Node[]; edges: Edge[] }
  nodeData: NodeData
  nodes: Node[]
  edges: Edge[]
  setNodes: (data: Node[]) => void
  setEdges: (data: Edge[]) => void
  updateEmailData: (id: string, data: Partial<NodeData['email']>) => void
  updateLogData: (id: string, data: Partial<NodeData['log']>) => void
  updateCalculationData: (
    id: string,
    data: Partial<NodeData['calculation']>
  ) => void
  saveAsDefault: (nodes: Node[], edges: Edge[]) => void
  loadDefaultTemplate: () => void
  addNode: (type: 'email' | 'log' | 'calculation') => void
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  nodes: [],

  edges: [],

  defaultTemplate: { nodes: [], edges: [] },

  nodeData: {},

  // actions
  addNode: (type) => {
    const { nodes, nodeData } = get()
    let newNode

    switch (type) {
      case 'email':
        newNode = DEFAULT_EMAIL_NODE()
        break
      case 'calculation':
        newNode = DEFAULT_CALCULATION_NODE()
        break
      default:
        newNode = DEFAULT_LOG_NODE()
    }
    const data = getDefaultNodeData(newNode.type)

    set({
      nodes: [...nodes, newNode],
      nodeData: { ...nodeData, [newNode.id]: data },
    })
  },

  setNodes: (data) =>
    set(() => ({
      nodes: data,
    })),

  setEdges: (data) =>
    set(() => ({
      edges: data,
    })),

  saveAsDefault: (nodes: Node[], edges: Edge[]) => {
    set(() => ({
      defaultTemplate: { nodes, edges },
    }))
    const { nodeData } = get()
    localStorage.setItem('defaultTemplate', JSON.stringify({ nodes, edges }))
    localStorage.setItem('nodeData', JSON.stringify(nodeData))
    useToastStore
      .getState()
      .setToast({ title: 'Successfully saved.', type: 'success' })
  },

  loadDefaultTemplate: () => {
    const defaultTemplate = localStorage.getItem('defaultTemplate')
    const defaultNodeData = localStorage.getItem('nodeData')
    if (defaultTemplate && defaultNodeData) {
      const template: { nodes: Node[]; edges: Edge[] } =
        JSON.parse(defaultTemplate)
      set(() => ({
        nodes: template.nodes,
        edges: template.edges,
        nodeData: JSON.parse(defaultNodeData),
      }))
      return useToastStore
        .getState()
        .setToast({ title: 'Successfully loaded.', type: 'success' })
    }
    useToastStore
      .getState()
      .setToast({ title: "There's no template.", type: 'error' })
  },

  updateEmailData: (id, data) =>
    set((state) => ({
      nodeData: {
        ...state.nodeData,
        [id]: { ...state.nodeData[id], ...data },
      },
    })),

  updateLogData: (id, data) =>
    set((state) => ({
      nodeData: { ...state.nodeData, [id]: { ...state.nodeData[id], ...data } },
    })),

  updateCalculationData: (id, data) =>
    set((state) => ({
      nodeData: {
        ...state.nodeData,
        [id]: { ...state.nodeData[id], ...data },
      },
    })),
}))
