import { ConfigService } from '@nestjs/config';

export interface ConfigurationVars {
	REDIS_CONNECTION_STRING: string;
	OPENAI_KEY: string;
	SERVER_PORT: number;
}

export type Configuration = ConfigService<ConfigurationVars, true>;
