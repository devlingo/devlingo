export const OpenAIResponse = {
	response:
		'To add a MySQL database connected to the backend, we need to add a new node of type MySQL and connect it to the NestJS backend node using an edge of type default. This will allow the backend to communicate with the MySQL database and perform CRUD operations. \n\nHere is the updated JSON with the MySQL node and edge added:\n\n{\n  "nodes": [\n    {\n      "data": {\n        "nodeType": "NextJS",\n        "formData": {\n          "nodeName": "Frontend"\n        },\n        "childNodes": []\n      },\n      "id": "QMGfvyzBBhF-2BiDdIOGe",\n      "position": {\n        "x": 1300,\n        "y": 50\n      },\n      "type": "CanvasNodeComponent"\n    },\n    {\n      "data": {\n        "nodeType": "NestJS",\n        "formData": {\n          "nodeName": "Backend"\n        }\n      },\n      "id": "KZA-U5dr_r7L4AJK4A9Xd",\n      "position": {\n        "x": 700,\n        "y": 50\n      },\n      "type": "CanvasNodeComponent"\n    },\n    {\n      "data": {\n        "nodeType": "MySQL",\n        "formData": {\n          "nodeName": "Database"\n        }\n      },\n      "id": "JZa-U5dr_r7L4AJK4A9Xd",\n      "position": {\n        "x": 1000,\n        "y": 50\n      },\n      "type": "CanvasNodeComponent"\n    }\n  ],\n  "edges": [\n    {\n      "id": "edge-1",\n      "source": "QMGfvyzBBhF-2BiDdIOGe",\n      "target": "KZA-U5dr_r7L4AJK4A9Xd",\n      "type": "smoothstep"\n    },\n    {\n      "id": "edge-2",\n      "source": "KZA-U5dr_r7L4AJK4A9Xd",\n      "target": "JZa-U5dr_r7L4AJK4A9Xd",\n      "type": "default"\n    }\n  ]\n}',
};
