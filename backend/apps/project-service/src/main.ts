import { ConfigService } from '@nestjs/config';
import { ApiVersions } from 'shared/constants';
import { ConfigurationVars } from 'shared/types';
import { createNestApp } from 'shared/utils/configuration.utils';

import { AppModule } from './app';

(async () => {
	const app = await createNestApp({
		appModule: AppModule,
		version: ApiVersions.V1,
		title: 'Project Service API',
		description: 'An API that allows interacting with project data',
	});

	const configService = app.get(ConfigService<ConfigurationVars, true>);
	const port = configService.get<number>('SERVER_PORT')!;

	await app.listen(port);
})();
