import { NodeType } from 'shared/types';

export interface DropTargetData {
	dropEffect: string;
	nodeType: NodeType;
	x: number;
	y: number;
}

export type ImageType = 'png' | 'jpeg' | 'svg';

export interface ThemeColors {
	accent: string;
	accentContent: string;
	accentFocus: string;
	base100: string;
	base200: string;
	base300: string;
	baseContent: string;
	error: string;
	errorContent: string;
	info: string;
	infoContent: string;
	neutral: string;
	neutralContent: string;
	neutralFocus: string;
	primary: string;
	primaryContent: string;
	primaryFocus: string;
	secondary: string;
	secondaryContent: string;
	secondaryFocus: string;
	success: string;
	successContent: string;
	warning: string;
	warningContent: string;
}
