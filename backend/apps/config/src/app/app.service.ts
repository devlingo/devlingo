import { Injectable } from '@nestjs/common';
import { Messages } from 'shared/constants';

@Injectable()
export class AppService {
	healthCheck(): Messages {
		return Messages.HEALTH_CHECK;
	}
}
