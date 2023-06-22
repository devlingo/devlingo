export const add_node =
	'Add Node Command Guide (A_N) - This command allows you to add a new node to the design. The command follows the format: A_N <id> <type> <name> <x> <y>. Parameters: <id>: A unique identifier for the node. <type>: The type of the node. The type must be present in the provided list of node types. <name>: The name of the node. <x> and <y>: The x and y positions of the node. all the fields are mandatory';

export const remove_node =
	'Remove Node Command Guide (R_N) - This command allows you to remove a node from the design. The command follows the format: R_N <id>. Parameters: <id>: The unique identifier of the node to be removed.';

export const update_node =
	'Update Node Command Guide (U_N) - This command allows you to update the properties of a node. The command follows the format: U_N <id> <prop1> <val1> <prop2> <val2> .... Parameters: <id>: The unique identifier of the node to be updated. <prop> and <val> pairs: The properties to be updated and their new values. The following properties can be updated: t: type (must be present in the provided list of node types), n: name, x and y: position.';

export const add_edge =
	'Add Edge Command Guide (A_E) - This command allows you to add a new edge to the design. The command follows the format: A_E <id> <src> <tgt> <type>. Parameters: <id>: A unique identifier for the edge. <src> and <tgt>: The source and target nodes of the edge. <type>: The type of the edge. The type must be present in the provided list of edge types.';

export const remove_edge =
	'Remove Edge Command Guide (R_E) - This command allows you to remove an edge from the design. The command follows the format: R_E <id>. Parameters: <id>: The unique identifier of the edge to be removed.';

export const update_edge =
	'Update Edge Command Guide (U_E) - This command allows you to update the properties of an edge. The command follows the format: U_E <id> <prop1> <val1> <prop2> <val2> .... Parameters: <id>: The unique identifier of the edge to be updated. <prop> and <val> pairs: The properties to be updated and their new values. The following properties can be updated: s: source, t: target, ty: type (must be present in the provided list of edge types).';
