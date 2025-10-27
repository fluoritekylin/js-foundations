interface Node {
    id: number;
    name: string;
    parentId: number | null
}

interface TreeNode {
    id: number;
    name: string;
    children?: TreeNode[]
}
const input: Node[] = [
    { id: 1, name: 'A', parentId: null },
    { id: 2, name: 'B', parentId: 1 },
    { id: 3, name: 'C', parentId: 1 },
    { id: 4, name: 'D', parentId: 2 }
];

function toTreeByStack(array: Node[]) {
    const childrenMap = new Map<number|null, TreeNode[]>()
    let root = null
    array.forEach((item) => {
        if(item.parentId === null) {
            root = {
                id: item.id,
                name: item.name
            }
        }
        if (!childrenMap.has(item.parentId)) {
            childrenMap.set(item.parentId, [])
        }
        childrenMap.get(item.parentId)?.push({
            id: item.id,
            name: item.name
        })
    })
    if (!root) return []
    const stack: TreeNode[] = [root]
    while (stack.length > 0) {
        const currentNode: TreeNode = stack.pop()!
        const children = childrenMap.get(currentNode.id)
        if (children) {
            currentNode.children = []
            children?.forEach((child) => {
                currentNode.children?.push(child)
                stack.push(child)
            })
        }
    }

    return [root]
}

function toTreeByIteration(array: Node[]): TreeNode[] {
    const nodeMap = new Map<number|null, TreeNode>()
    const root: TreeNode[] = []
    array.forEach((node) => {
        nodeMap.set(node.id, {
            id: node.id,
            name: node.name,
        })
    })

    array.forEach(node => {
        if (node.parentId === null) {
            root.push(nodeMap.get(node.id)!)
        } else {
            const parent = nodeMap.get(node.parentId)!
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(nodeMap.get(node.id)!)
        }
    })

    return root

}
console.dir(toTreeByStack(input), {depth: null})
console.dir(toTreeByIteration(input), {depth: null})