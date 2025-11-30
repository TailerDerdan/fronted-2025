import { MutableRefObject } from 'react';
import { Id } from '../id/Id';
import { OnEndArgs } from '../../lib/useDragAndDrop';

export type SetCoordsFn = (coords: { x: number; y: number }) => void;

export type InfoAboutRect = {
	id: Id;
	refObj: MutableRefObject<HTMLDivElement | null>;
	coordsObj: { x: number; y: number };
	setCoordsObj: SetCoordsFn;
	onEnd: (args: OnEndArgs) => void;
};

export type InfoAboutSlide = {
	id: Id;
	refObj: MutableRefObject<HTMLDivElement | null>;
	fromIndexOfSlide: number;
	toIndexOfSlide: number;
	positionAroundOfToIndex: 'after' | 'before';
	coordsSlide: { x: number; y: number };
	setCoordsSlide: SetCoordsFn;
	originalStyle: MutableRefObject<{ position: string; top: string; left: string }>;
};
