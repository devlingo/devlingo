Design Data Editing Command Guide
To interact with the Design Data Editing System, you can use the following list of commands. Each command is a string with multiple components, each separated by a space.

Node commands
Add Node (A_N)
The Add Node command allows you to add a new node to the design. The command follows the format:
A_N <id> <type> <name> <x> <y>
Parameters:
<id>: A unique identifier for the node
<type>: The type of the node. The type must be present in the provided list of node types
<name>: The name of the node
<x> and <y>: The x and y positions of the node

Remove Node (R_N)
The Remove Node command allows you to remove a node from the design. The command follows the format:
R_N <id>
Parameters:
<id>: The unique identifier of the node to be removed
Update Node (U_N)
The Update Node command allows you to update the properties of a node. The command follows the format:
U_N <id> <prop1> <val1> <prop2> <val2> ...
Parameters:
<id>: The unique identifier of the node to be updated
<prop> and <val> pairs: The properties to be updated and their new values. The following properties can be updated:
t: type (must be present in the provided list of node types)
n: name
x and y: position

Edge commands
Add Edge (A_E)
The Add Edge command allows you to add a new edge to the design. The command follows the format:
A_E <id> <src> <tgt> <type>
Parameters:
<id>: A unique identifier for the edge
<src> and <tgt>: The source and target nodes of the edge
<type>: The type of the edge. The type must be present in the provided list of edge types

Remove Edge (R_E)
The Remove Edge command allows you to remove an edge from the design. The command follows the format:
R_E <id>
Parameters:
<id>: The unique identifier of the edge to be removed

Update Edge (U_E)
The Update Edge command allows you to update the properties of an edge. The command follows the format:
U_E <id> <prop1> <val1> <prop2> <val2> ...
Parameters:
<id>: The unique identifier of the edge to be updated
<prop> and <val> pairs: The properties to be updated and their new values. The following properties can be updated:
s: source
t: target
ty: type (must be present in the provided list of edge types)
This guide provides the list of available commands for interacting with the design data editing system. Each command manipulates the design data object in some way, either by adding, removing, or updating nodes and edges.
