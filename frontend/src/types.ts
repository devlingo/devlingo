import { NodeType } from 'shared/types';

export interface DropTargetData {
	dropEffect: string;
	nodeType: NodeType;
	x: number;
	y: number;
}

export type ImageType = 'png' | 'jpeg' | 'svg';

export interface ThemeColors {
	primary: string;
	primaryFocus: string;
	primaryContent: string;
	secondary: string;
	secondaryFocus: string;
	secondaryContent: string;
	accent: string;
	accentFocus: string;
	accentContent: string;
	neutral: string;
	neutralFocus: string;
	neutralContent: string;
	base100: string;
	base200: string;
	base300: string;
	baseContent: string;
	info: string;
	infoContent: string;
	success: string;
	successContent: string;
	warning: string;
	warningContent: string;
	error: string;
	errorContent: string;
}
