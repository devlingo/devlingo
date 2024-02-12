import { NodeShape } from 'shared/constants';

export const ShapeComponents: Record<
	NodeShape,
	React.FC<
		{
			height: number;
			width: number;
		} & React.SVGProps<any>
	>
> = {
	[NodeShape.ArrowRight]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,0 L${width - 55},0  L${width},${height / 2} L${
					width - 55
				},${height} L0,${height} z`}
			/>
		</svg>
	),
	[NodeShape.ArrowLeft]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${
					height / 2
				} L55,0  L${width},0 L${width},${height} L55,${height} z`}
			/>
		</svg>
	),
	[NodeShape.Circle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<circle cx={width / 2} cy={width / 2} r={width / 2} />
		</svg>
	),
	[NodeShape.Database]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${height * 0.125}  L 0,${height - height * 0.125} A ${
					width / 2
				} ${height * 0.125} 0 1 0 ${width} ${
					height - height * 0.125
				} L ${width},${height * 0.125} A ${width / 2} ${
					height * 0.125
				} 0 1 1 0 ${height * 0.125} A ${width / 2} ${
					height * 0.125
				} 0 1 1 ${width} ${height * 0.125} A ${width / 2} ${
					height * 0.125
				} 0 1 1 0 ${height * 0.125} z`}
			/>
		</svg>
	),
	[NodeShape.Diamond]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${
					width / 2
				},${height} z`}
			/>
		</svg>
	),
	[NodeShape.Ellipse]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<ellipse
				cx={width / 2}
				cy={height / 2}
				rx={width / 2}
				ry={height / 3}
			/>
		</svg>
	),
	[NodeShape.Hexagon]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M${width * 0.25},0 L${width * 0.75},0  L${width},${
					height / 2
				} L${width * 0.75},${height} L${width * 0.25},${height} L0,${
					height / 2
				} z`}
			/>
		</svg>
	),
	[NodeShape.ParallelogramRight]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${height} L${width * 0.25},0 L${width},0 L${
					width - width * 0.25
				},${height} z`}
			/>
		</svg>
	),
	[NodeShape.ParallelogramLeft]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M${width * 0.25},${height} L0,0 L${width},0 L${
					width - width * 0.25
				},0 L${width}, ${height} z`}
			/>
		</svg>
	),
	[NodeShape.Rectangle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<rect x={0} y={0} width={width} height={height} />
		</svg>
	),
	[NodeShape.RoundedRectangle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<rect x={0} y={0} rx={20} width={width} height={height} />
		</svg>
	),
	[NodeShape.Triangle]: ({ width, height, ...props }) => (
		<svg
			viewBox={`0 0 ${height} ${width}`}
			height={height}
			width={width}
			fill="currentColor"
			{...props}
		>
			<path d={`M0,${height} L${width / 2},0 L${width},${height} z`} />
		</svg>
	),
};
