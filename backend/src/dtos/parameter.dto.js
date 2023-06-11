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
exports.VersionParam =
	exports.NameParam =
	exports.DesignIdParam =
	exports.ProjectIdParam =
		void 0;
const class_validator_1 = require('class-validator');
class ProjectIdParam {
	projectId;
}
exports.ProjectIdParam = ProjectIdParam;
__decorate(
	[
		(0, class_validator_1.IsUUID)('4'),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', String),
	],
	ProjectIdParam.prototype,
	'projectId',
	void 0,
);
class DesignIdParam {
	designId;
}
exports.DesignIdParam = DesignIdParam;
__decorate(
	[
		(0, class_validator_1.IsUUID)('4'),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', String),
	],
	DesignIdParam.prototype,
	'designId',
	void 0,
);
class NameParam {
	name;
}
exports.NameParam = NameParam;
__decorate(
	[
		(0, class_validator_1.IsAlphanumeric)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', String),
	],
	NameParam.prototype,
	'name',
	void 0,
);
class VersionParam {
	version;
}
exports.VersionParam = VersionParam;
__decorate(
	[
		(0, class_validator_1.IsPositive)(),
		(0, class_validator_1.IsInt)(),
		__metadata('design:type', Number),
	],
	VersionParam.prototype,
	'version',
	void 0,
);
//# sourceMappingURL=parameter.dto.js.map
