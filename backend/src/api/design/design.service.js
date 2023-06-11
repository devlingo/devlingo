'use strict';
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (
			typeof Reflect === 'object' &&
			typeof Reflect.decorate === 'function'
		)
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r =
						(c < 3
							? d(r)
							: c > 3
							? d(target, key, r)
							: d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (
			typeof Reflect === 'object' &&
			typeof Reflect.metadata === 'function'
		)
			return Reflect.metadata(k, v);
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.DesignService = void 0;
const common_1 = require('@nestjs/common');
const prisma_service_1 = require('../../modules/prisma/prisma.service');
let DesignService = (exports.DesignService = class DesignService {
	prisma;
	constructor(prisma) {
		this.prisma = prisma;
	}
	async deleteDesignVersion({ projectId, name, version }) {
		await this.prisma.design.delete({
			where: { name_version_projectId: { name, projectId, version } },
		});
	}
	async retrieveDesignVersion({ projectId, name, version }) {
		return await this.prisma.design.findUniqueOrThrow({
			where: { name_version_projectId: { name, projectId, version } },
		});
	}
	async retrieveProjectDesignVersions({ projectId }) {
		return await this.prisma.design.findMany({
			select: { name: true, version: true },
			orderBy: {
				name: 'asc',
			},
			where: { projectId },
		});
	}
	async createDesignVersion(data) {
		return await this.prisma.design.create({ data });
	}
});
exports.DesignService = DesignService = __decorate(
	[
		(0, common_1.Injectable)(),
		__metadata('design:paramtypes', [prisma_service_1.PrismaService]),
	],
	DesignService,
);
//# sourceMappingURL=design.service.js.map
