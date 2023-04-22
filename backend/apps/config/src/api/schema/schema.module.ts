import { Module } from '@nestjs/common';

import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';

@Module({
	imports: [],
	controllers: [SchemaController],
	providers: [SchemaService],
})
export class SchemaModule {}
