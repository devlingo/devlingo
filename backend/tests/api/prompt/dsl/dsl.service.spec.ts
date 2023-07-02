import { expect } from 'vitest';

import { DSLService } from '@/api/prompt/dsl/dsl-service';
import { DesignData } from '@/api/prompt/types';

describe('DSLService class', () => {
	it('executeCommands add new node per proper command', () => {
		const commands = new DSLService(
			createSoftwareArchitecture(),
			edgeTypes,
			nodesTypes,
		);
		const nodePreExecute = commands.design.nodes.find(
			(node) => node.id === 'db1',
		);
		expect(nodePreExecute).toBeFalsy();
		commands.executeCommands('A_N db1 DynamoDB Database 200 200');

		const newNode = commands.design.nodes.find((node) => node.id === 'db1');

		expect(newNode).toBeDefined();
		expect(newNode?.data.nodeType).toBe('DynamoDB');
		expect(newNode?.data.formData.nodeName).toBe('Database');
		expect(newNode?.position.x).toBe(200);
		expect(newNode?.position.y).toBe(200);
		expect(newNode?.type).toBe('DynamoDB');
	});

	it('executeCommands add new node even if command is not first word', () => {
		const commands = new DSLService(
			createSoftwareArchitecture(),
			edgeTypes,
			nodesTypes,
		);
		commands.executeCommands('bla A_N db1 DynamoDB Database 200 200');

		const newNode = commands.design.nodes.find((node) => node.id === 'db1');

		expect(newNode).toBeDefined();
		expect(newNode?.data.nodeType).toBe('DynamoDB');
		expect(newNode?.data.formData.nodeName).toBe('Database');
		expect(newNode?.position.x).toBe(200);
		expect(newNode?.position.y).toBe(200);
		expect(newNode?.type).toBe('DynamoDB');
	});
	it('executeCommands add new MongoDB node and associated edge per proper command', () => {
		const commands = new DSLService(
			createSoftwareArchitecture(),
			edgeTypes,
			nodesTypes,
		);
		commands.executeCommands(
			'A_N 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 MongoDB Database 700 500 A_E 9f4c2e95-d916-4a5d-9afc-caa405396d4c 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 54b111d0-9c3a-4687-8199-c2ba25f480a2 default',
		);

		const newNode = commands.design.nodes.find(
			(node) => node.id === '5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
		);
		expect(newNode).toBeDefined();
		expect(newNode?.data.nodeType).toBe('MongoDB');
		expect(newNode?.data.formData.nodeName).toBe('Database');
		expect(newNode?.position.x).toBe(700);
		expect(newNode?.position.y).toBe(500);
		expect(newNode?.type).toBe('MongoDB');

		const newEdge = commands.design.edges.find(
			(edge) => edge.id === '9f4c2e95-d916-4a5d-9afc-caa405396d4c',
		);
		expect(newEdge).toBeDefined();
		expect(newEdge?.source).toBe('5a6c3b5a-9c3a-4687-8199-c2ba25f480a2');
		expect(newEdge?.target).toBe('54b111d0-9c3a-4687-8199-c2ba25f480a2');
		expect(newEdge?.type).toBe('default');
	});
	it('executeCommands adds new node and edge per combined commands', () => {
		const softwareArchitecture = createSoftwareArchitecture();

		const commands = new DSLService(
			softwareArchitecture,
			edgeTypes,
			nodesTypes,
		);
		// Add new node and new edge commands
		commands.executeCommands(
			'A_N 9b3c6d1a-5d8f-4d8d-9b1a-3e7d2d2d4d0c MongoDB Database 1000 300 A_E b01e8d2c-bd71-4f2a-883b-b06d22c581e8 9b3c6d1a-5d8f-4d8d-9b1a-3e7d2d2d4d0c node2 default',
		);

		const newNode = commands.design.nodes.find(
			(node) => node.id === '9b3c6d1a-5d8f-4d8d-9b1a-3e7d2d2d4d0c',
		);

		expect(newNode).toBeDefined();
		expect(newNode?.data.nodeType).toBe('MongoDB');
		expect(newNode?.data.formData.nodeName).toBe('Database');
		expect(newNode?.position.x).toBe(1000);
		expect(newNode?.position.y).toBe(300);
		expect(newNode?.type).toBe('MongoDB');

		const newEdge = commands.design.edges.find(
			(edge) => edge.id === 'b01e8d2c-bd71-4f2a-883b-b06d22c581e8',
		);

		expect(newEdge).toBeDefined();
		expect(newEdge?.source).toBe('9b3c6d1a-5d8f-4d8d-9b1a-3e7d2d2d4d0c');
		expect(newEdge?.target).toBe('node2');
		expect(newEdge?.type).toBe('default');
	});

	it('executeCommands adds new node and edge with commands on new line without spacing', () => {
		const commands = new DSLService(
			createSoftwareArchitecture(),
			edgeTypes,
			nodesTypes,
		);
		// Add new node and new edge commands
		commands.executeCommands(
			'A_N 1 MongoDB Database 1000 50\nA_E 13 1 f71e7e23-0238-4d7a-a60c-c4ac919b2b58 default',
		);

		const newNode = commands.design.nodes.find((node) => node.id === '1');

		expect(newNode).toBeDefined();
		expect(newNode?.data.nodeType).toBe('MongoDB');
		expect(newNode?.data.formData.nodeName).toBe('Database');
		expect(newNode?.position.x).toBe(1000);
		expect(newNode?.position.y).toBe(50);
		expect(newNode?.type).toBe('MongoDB');

		const newEdge = commands.design.edges.find((edge) => edge.id === '13');
		expect(newEdge).toBeDefined();
		expect(newEdge?.source).toBe('1');
		expect(newEdge?.target).toBe('f71e7e23-0238-4d7a-a60c-c4ac919b2b58');
		expect(newEdge?.type).toBe('default');
	});
});
const createSoftwareArchitecture = (): DesignData => ({
	nodes: [
		{
			data: {
				nodeType: 'Frontend',
				formData: {
					nodeName: 'Flutter',
				},
			},
			id: 'node1',
			position: {
				x: 100,
				y: 100,
			},
			type: 'FrontendType',
		},
		{
			data: {
				nodeType: 'Backend',
				formData: {
					nodeName: 'NestJS',
				},
			},
			id: 'node2',
			position: {
				x: 300,
				y: 100,
			},
			type: 'BackendType',
		},
	],
	edges: [
		{
			id: 'edge1',
			source: 'node1',
			target: 'node2',
			type: 'BezierEdge',
		},
	],
});
const nodesTypes = [
	'Angular',
	'API',
	'ArrowLeft',
	'Backend',
	'Cassandra',
	'Cloud',
	'Controller',
	'CosmosDB',
	'Database',
	'Django',
	'DynamoDB',
	'Endpoint',
	'FastAPI',
	'Firebird',
	'Firestore',
	'Flask',
	'Flutter',
	'Frontend',
	'Hbase',
	'Ios',
	'Litestar',
	'MariaDB',
	'Marketing',
	'MicrosoftSQL',
	'Module',
	'MongoDB',
	'MySQL',
	'NestJS',
	'NextJS',
	'Oracle',
	'Plus',
	'PostgresSQL',
	'ReactLogo',
	'ReactNative',
	'Redis',
	'Service',
	'Solid',
	'SQLite',
	'Svelte',
	'Vue',
	'Amazon EC2',
	'Amazon S3',
	'Amazon RDS',
	'Amazon Lambda',
	'Amazon CloudFront',
	'Azure App Service',
	'Azure Functions',
	'Azure Cosmos DB',
	'Google Cloud Platform',
	'Google Compute Engine',
	'Google Cloud Storage',
	'Google BigQuery',
	'Heroku',
	'DigitalOcean',
	'Kubernetes',
	'Docker',
	'Apache Kafka',
	'Apache Spark',
	'Apache Hadoop',
	'Nginx',
	'RabbitMQ',
	'Consul',
	'Vault',
	'etcd',
	'Istio',
	'Envoy',
	'Jenkins',
	'Travis CI',
	'CircleCI',
	'GitLab CI/CD',
	'Bitbucket Pipelines',
	'SonarQube',
	'Grafana',
	'Prometheus',
	'ELK Stack',
	'Splunk',
	'New Relic',
	'Datadog',
	'AWS CloudFormation',
	'Azure Resource Manager',
	'Terraform',
	'Ansible',
	'Puppet',
	'Chef',
	'Apache Mesos',
	'Apache ZooKeeper',
	'Kong',
	'HAProxy',
	'NGINX Plus',
	'Tyk',
	'Apache Cassandra',
	'Apache ActiveMQ',
	'Apache Solr',
	'Elasticsearch',
	'Memcached',
	'PostgreSQL',
	'Microsoft SQL Server',
	'Apache Flink',
	'Apache Beam',
	'Apache Airflow',
	'Apache NiFi',
	'Apache Zeppelin',
	'Tableau',
	'Kibana',
	'Apache Superset',
	'Power BI',
	'Jupyter Notebook',
	'Apache HBase',
	'Apache CouchDB',
	'Neo4j',
	'Apache Lucene',
	'Apache Thrift',
	'gRPC',
	'REST',
	'GraphQL',
	'Apache Avro',
	'Protocol Buffers',
	'Microsoft Azure',
	'Google Cloud',
	'IBM Cloud',
	'Oracle Cloud',
	'AWS Lambda',
	'AWS S3',
	'Azure Kubernetes Service (AKS)',
	'Google Kubernetes Engine (GKE)',
	'AWS Elastic Beanstalk',
	'Azure Container Instances',
	'Google App Engine',
	'AWS CloudFront',
	'Azure CDN',
	'Google Cloud CDN',
	'AWS API Gateway',
	'Azure API Management',
	'Google Cloud Endpoints',
	'AWS Step Functions',
	'Azure Logic Apps',
	'Google Cloud Functions',
	'AWS SQS',
	'Azure Service Bus',
	'Google Cloud Pub/Sub',
	'AWS Kinesis',
	'Azure Event Hubs',
	'AWS Glue',
	'Azure Data Factory',
	'Google Cloud Dataflow',
	'AWS Athena',
	'Azure Databricks',
	'Google BigQuery ML',
	'AWS Sagemaker',
	'Azure Machine Learning',
	'Google Cloud AutoML',
	'AWS Comprehend',
	'Azure Cognitive Services',
	'Google Cloud Natural Language',
	'AWS Rekognition',
	'Azure Computer Vision',
	'Google Cloud Vision API',
	'AWS Polly',
	'Azure Text-to-Speech',
	'Google Cloud Text-to-Speech',
	'AWS Transcribe',
	'Azure Speech to Text',
	'Google Cloud Speech-to-Text',
	'AWS Translate',
	'Azure Translator Text',
	'Google Cloud Translation',
	'AWS Lex',
	'Azure Bot Service',
	'Google Dialogflow',
	'AWS IoT Core',
	'Azure IoT Hub',
	'Google Cloud IoT Core',
	'AWS Greengrass',
	'Azure IoT Edge',
	'Google Cloud IoT Edge',
	'AWS CloudWatch',
	'Azure Monitor',
	'Google Cloud Monitoring',
	'AWS CloudTrail',
	'Azure Activity Log',
	'Google Cloud Audit Logging',
	'AWS X-Ray',
	'Azure Application Insights',
	'Google Cloud Trace',
	'AWS Config',
	'Azure Policy',
	'Google Cloud Security Command Center',
	'AWS Secrets Manager',
	'Azure Key Vault',
	'Google Cloud KMS',
	'AWS WAF',
	'Azure Web Application Firewall',
	'Google Cloud Armor',
	'AWS Shield',
	'Azure DDoS Protection',
	'Google Cloud DDoS Protection',
	'AWS IAM',
	'Azure Active Directory',
	'Google Cloud IAM',
	'AWS Cognito',
	'Azure AD B2C',
	'Google Cloud Identity Platform',
	'AWS Security Token Service',
	'Azure Active Directory B2B',
	'Google Cloud Identity-Aware Proxy',
	'AWS CloudHSM',
	'Azure Dedicated HSM',
	'Google Cloud HSM',
	'AWS Systems Manager',
	'Azure Automation',
	'Google Cloud Operations Suite',
	'AWS CloudFormation',
	'Azure Resource Manager',
	'Google Cloud Deployment Manager',
	'AWS Service Catalog',
	'Azure Blueprints',
	'Google Cloud Load Balancing',
	'Azure Load Balancer',
	'AWS Route 53',
	'Azure DNS',
	'Google Cloud DNS',
	'AWS Direct Connect',
	'Azure ExpressRoute',
	'Google Cloud Interconnect',
	'AWS VPN',
	'Azure VPN Gateway',
	'Google Cloud VPN',
	'AWS Direct Connect Gateway',
	'Azure Virtual WAN',
	'Google Cloud Network Service Tiers',
	'AWS Storage Gateway',
	'Azure File Sync',
	'Google Cloud Filestore',
	'AWS Snowball',
	'Azure Data Box',
	'Google Cloud Transfer Appliance',
	'AWS Database Migration Service',
	'Azure Database Migration Service',
	'Google Cloud Database Migration Service',
	'AWS DMS',
	'Google Cloud Data Transfer',
	'Azure Data Factory',
];
enum EdgeTypes {
	BezierEdge = 'default',
	StraightEdge = 'straight',
	StepEdge = 'step',
	SmoothStepEdg = 'smoothstep',
	SimpleBezier = 'simplebezier',
}
const edgeTypes: string[] = Object.values<string>(EdgeTypes);
