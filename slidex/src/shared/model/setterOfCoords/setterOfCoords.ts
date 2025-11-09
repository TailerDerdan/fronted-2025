import { MutableRefObject } from 'react';
import { Id } from '../id/Id';

export type SetCoordsFn = (coords: { x: number; y: number }) => void;

export type InfoAboutRect = {
	id: Id;
	refObj: MutableRefObject<HTMLDivElement | null>;
	coordsObj: { x: number; y: number };
	setCoordsObj: SetCoordsFn;
	onEnd: (newX: number, newY: number) => void;
};
