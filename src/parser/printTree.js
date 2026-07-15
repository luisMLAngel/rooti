export function printTree(message) {
  console.log(`\n ${message} \n`)
  return function recursivePrint(nodes, prefix = '') {
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1
      const connector = isLast ? '└── ' : '├── '
      console.log(`${prefix}${connector}${node.name}`)
      if (node.children?.length > 0) {
        const childPrefix = prefix + (isLast ? '    ' : '│   ')
        recursivePrint(node.children ?? [], childPrefix)
      }
    })
  }
}
