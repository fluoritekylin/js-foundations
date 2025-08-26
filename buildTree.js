function buildTreeByRecursion(items) {
    const childrenMap = new Map()
    for (let item of items) {
        const key = item.parentId
        if(!childrenMap.has(key)) {
            childrenMap.set(key, [])
        }
        childrenMap.get(key).push(item)
    }
    console.log('map', childrenMap);

    const root = items.find(item => item.parentId === null)
    if (!root) return [];

    function attachChildren(node) {
        console.log('current node', node);

        const currentObj = { id: node.id, name: node.name }
        const children = childrenMap.get(node.id) || []
        if (children.length) {
            currentObj.children = []
            children.forEach((child) => {
                currentObj.children.push(attachChildren(child))
            })
        }
        return currentObj
    }
    return [attachChildren(root)]
}

function buildTreeByIteration(items) {
    const nodeMap = new Map()
    items.forEach(item => nodeMap.set(item.id, {id: item.id, name: item.name, children: []}))
    const root = []
    items.forEach(item => {
        if (item.parentId === null) {
            root.push(nodeMap.get(item.id))
        }
        else {
            const parent = nodeMap.get(item.parentId)
            if (parent) {
                parent.children.push(nodeMap.get(item.id))
            }
        }
    })

    return root;
}
// 输入
const input = [
  { id: 1, name: 'A', parentId: null },
  { id: 2, name: 'B', parentId: 1 },
  { id: 3, name: 'C', parentId: 1 },
  { id: 4, name: 'D', parentId: 2 }
];

console.dir(buildTreeByRecursion(input), {depth: null})
console.dir(buildTreeByIteration(input), {depth: null})

/* 期望输出：
[
  {
    id: 1,
    name: 'A',
    children: [
      {
        id: 2,
        name: 'B',
        children: [{ id:4, name:'D' }]
      },
      { id: 3, name: 'C' }
    ]
  }
]
*/
