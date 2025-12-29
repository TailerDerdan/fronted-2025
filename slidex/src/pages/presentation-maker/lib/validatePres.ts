import { SlidesState } from '../../../entities/presentation/model/slideSlice';
import Ajv, { JSONSchemaType } from 'ajv';
import { Background } from '../../../shared/model/background/Background';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Font } from '../../../shared/model/font/Font';
import { Text, TextBox } from '../../../shared/model/textbox/types';
import { Image } from '../../../shared/model/image/types';
import { SlideObj } from '../../../shared/model/objOnSlide';
import { Slide } from '../../../entities/slide/model/types';
import { Alignment } from '../../../shared/model/alignment/Alignment';

const ajv = new Ajv();

const backgroundSchema: JSONSchemaType<Background> = {
	type: 'string',
};

const rectSchema: JSONSchemaType<Rect> = {
	type: 'object',
	properties: {
		x: { type: 'number' },
		y: { type: 'number' },
		width: { type: 'number' },
		height: { type: 'number' },
	},
	required: ['x', 'y', 'width', 'height'],
};

const fontSchema: JSONSchemaType<Font> = {
	type: 'object',
	properties: {
		fontFamily: { type: 'string' },
		fontSize: { type: 'number' },
		fontColor: { type: 'string' },
		isBold: { type: 'boolean' },
		isItalic: { type: 'boolean' },
		isUnderlined: { type: 'boolean' },
	},
	required: ['fontFamily', 'fontSize', 'fontColor', 'isBold', 'isItalic', 'isUnderlined'],
};

const textSchema: JSONSchemaType<Text> = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		content: { type: 'string' },
		font: fontSchema,
	},
	required: ['id', 'content', 'font'],
};

const textBoxSchema: JSONSchemaType<TextBox> = {
	type: 'object',
	properties: {
		type: { type: 'string', const: 'textbox' },
		rect: rectSchema,
		texts: { type: 'array', items: textSchema },
		alignment: {
			type: 'string',
			enum: [Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT],
		},
	},
	required: ['type', 'rect', 'texts', 'alignment'],
};

const imageSchema: JSONSchemaType<Image> = {
	type: 'object',
	properties: {
		type: { type: 'string', const: 'image' },
		src: { type: 'string' },
		id: { type: 'string' },
		rect: rectSchema,
		borderColor: { type: 'string' },
	},
	required: ['type', 'src', 'rect', 'borderColor'],
};

const slideObjSchema: JSONSchemaType<SlideObj> = {
	anyOf: [imageSchema, textBoxSchema],
};

const slideSchema: JSONSchemaType<Slide> = {
	type: 'object',
	properties: {
		objects: {
			type: 'object',
			additionalProperties: slideObjSchema,
			required: [],
		},
		layersOfSlide: {
			type: 'array',
			items: { type: 'string' },
		},
		background: backgroundSchema,
	},
	required: ['objects', 'layersOfSlide', 'background'],
};

const slidesStateSchema: JSONSchemaType<SlidesState> = {
	type: 'object',
	properties: {
		slideList: {
			type: 'object',
			additionalProperties: slideSchema,
			required: [],
		},
		slideOrder: {
			type: 'array',
			items: { type: 'string' },
		},
	},
	required: ['slideList', 'slideOrder'],
};

export const validate = ajv.compile<SlidesState>(slidesStateSchema);
