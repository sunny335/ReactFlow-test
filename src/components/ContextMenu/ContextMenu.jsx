import { Box, Button, Divider } from '@mui/material';
import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export default function ContextMenu({ id, top, left, right, bottom, ...props }) {

    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    const duplicateNode = useCallback(() => {
        const node = getNode(id);
        const position = {
            x: node.position.x + 150,
            y: node.position.y + 250,
        };
        addNodes({ ...node, id: `${node.id}-copy`, position });
    }, [id, getNode, addNodes]);
    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);
    const lockNode = useCallback(() => {
        setNodes(prevNodes => {
            return prevNodes.map(node => {
                if (node.id === id) {
                    const isLock = node.data.isLocked ? false : true;
                    return {
                        ...node,
                        draggable: !isLock,
                        connectable:!isLock,
                        data: {
                            ...node.data,
                            isLocked: isLock 
                        }
                    };
                }
                return node;
            });
        });
    }, [id]);
    const clearNodeInputs = useCallback(() => {
        setNodes(prevNodes => {
            return prevNodes.map(node => {
                if (node.id === id) {
                    const clear = node.data.clearInput ? false : true;
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            clearInput:true,
                        }
                    };
                }
                return node;
            });
        });
    }, [id, setNodes]);
    const currentNodeData = getNode(id).data.isLocked
    return (
        <Box style={{ top, left, right, bottom, position: "absolute", }}
            padding="5px"
            width="240px"
            sx={{ background: "#1f2337" }}
            borderRadius={3}
            zIndex={1000}
            // left={position.x - 400}
            // top={position.y - 120}
            position="absolute"
            display="flex"
            flexDirection="column"
            {...props}>
            <Button
                style={{ display: "flex", gap:"10px", alignItems: "center", paddingLeft: "10px", margin: "4px 0px", border: "0", color: "#fff", textAlign: "left", justifyContent: "flex-start" }}
                variant="outlined"
                onClick={duplicateNode}
            >
                <ContentCopyOutlinedIcon fontSize='small'/>
                Duplicate
            </Button>
            <Button
                style={{ display: "flex", gap:"10px", alignItems: "center", paddingLeft: "10px", margin: "4px 0px", border: "0", color: "#fff", textAlign: "left", justifyContent: "flex-start" }}
                variant="outlined"
                onClick={clearNodeInputs}
            >
                <ClearOutlinedIcon fontSize='small'/>
                Clear
            </Button>
            <Button
                style={{ display: "flex", gap:"10px", alignItems: "center", paddingLeft: "10px", margin: "4px 0px", border: "0", color: "#fff", textAlign: "left", justifyContent: "flex-start" }}
                variant="outlined"
                onClick={lockNode}
            >
                <LockOutlinedIcon fontSize='small'/>
             {!currentNodeData ? 'Lock' : 'Unlock'}   
            </Button>
            <Button
                style={{ display: "flex", gap:"10px", alignItems: "center", paddingLeft: "10px", margin: "4px 0px", border: "0", color: "#fff", textAlign: "left", justifyContent: "flex-start" }}
                variant="outlined"
                onClick={deleteNode}
            >
                <DeleteOutlinedIcon fontSize='small'/>
                Delete
            </Button>
            <Divider />
            <Button
                style={{ display: "flex", gap:"10px", alignItems: "center", paddingLeft: "10px", margin: "4px 0px", border: "0", color: "#fff", textAlign: "left", justifyContent: "flex-start" }}
                variant="outlined"
            >
                <AssignmentOutlinedIcon fontSize='small'/>
                 Documentation
            </Button>
        </Box>
    );
}


