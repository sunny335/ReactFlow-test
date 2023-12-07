import { useReactFlow } from "reactflow";

export const useNodeDataChange = () => {
  const { getNodes, setNodes } = useReactFlow();

  const changeNodeName = (id, type, name) => {
    const nodes = getNodes();
    const mappedNodes = nodes.map((node) => {
      if (node.id === id) {
        const updatedModuleElements = node.data.Module_Elements.map((input) => {
          const updatedInput = { ...input };

          if (type === "Selection_List") {
            if (
              updatedInput.Updated_Default_Value &&
              Array.isArray(updatedInput.Updated_Default_Value)
            ) {
              // If name is already in the Updated_Default_Value array, remove it
              const index = updatedInput.Updated_Default_Value.indexOf(name);
              if (index !== -1) {
                updatedInput.Updated_Default_Value.splice(index, 1);
              } else {
                // If name is not in the array, add it

                updatedInput.Updated_Default_Value.push(name);
              }
            } else {
              // If Updated_Default_Value is not an array, create a new array with the current value
              updatedInput.Updated_Default_Value = [name];
            }
          } else if (type === "Auto-select-all") {
            updatedInput.Updated_Default_Value.push(name);
            // updatedInput.Updated_Default_Value.push(name);
          } else if (type === "Clear-all") {
            const index = updatedInput.Updated_Default_Value.indexOf(name);
            if (index !== -1) {
              updatedInput.Updated_Default_Value.splice(index, 1);
            }
          } else {
            updatedInput.Updated_Default_Value = name;
          }
          return updatedInput;
        });
        return {
          ...node,
          data: {
            ...node.data,
            Module_Elements: updatedModuleElements,
          },
        };
      }
      return node;
    });
    setNodes(mappedNodes);
  };

  return {
    changeNodeName,
  };
};
