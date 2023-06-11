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
exports.PromptRequestDTO =
	exports.DesignVersionDTO =
	exports.ProjectCreateDTO =
		void 0;
const class_validator_1 = require('class-validator');
class ProjectCreateDTO {
	name;
}
exports.ProjectCreateDTO = ProjectCreateDTO;
__decorate(
	[
		(0, class_validator_1.Matches)(/[a-zA-Z0-9 \-_]+/),
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', String),
	],
	ProjectCreateDTO.prototype,
	'name',
	void 0,
);
class DesignVersionDTO {
	data;
	name;
}
exports.DesignVersionDTO = DesignVersionDTO;
__decorate(
	[(0, class_validator_1.IsObject)(), __metadata('design:type', Object)],
	DesignVersionDTO.prototype,
	'data',
	void 0,
);
__decorate(
	[
		(0, class_validator_1.IsAlphanumeric)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', String),
	],
	DesignVersionDTO.prototype,
	'name',
	void 0,
);
class PromptRequestDTO {
	promptContent;
	designData;
	nodeTypes;
	edgeTypes;
	modelName = 'gpt-3.5-turbo';
}
exports.PromptRequestDTO = PromptRequestDTO;
__decorate(
	[
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', String),
	],
	PromptRequestDTO.prototype,
	'promptContent',
	void 0,
);
__decorate(
	[
		(0, class_validator_1.IsObject)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', Object),
	],
	PromptRequestDTO.prototype,
	'designData',
	void 0,
);
__decorate(
	[
		(0, class_validator_1.IsArray)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', Array),
	],
	PromptRequestDTO.prototype,
	'nodeTypes',
	void 0,
);
__decorate(
	[
		(0, class_validator_1.IsArray)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata('design:type', Array),
	],
	PromptRequestDTO.prototype,
	'edgeTypes',
	void 0,
);
__decorate(
	[
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsOptional)(),
		__metadata('design:type', Object),
	],
	PromptRequestDTO.prototype,
	'modelName',
	void 0,
);
//# sourceMappingURL=body.dto.js.map
