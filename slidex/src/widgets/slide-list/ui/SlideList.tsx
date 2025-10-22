import { useRef, useState } from 'react';
import {
	addSelectedSlide,
	addSlide,
	clearSelectionObjs,
	clearSelectionSlides,
	setPositionSlide,
	setSelectedSlide,
} from '../../../entities/presentation/lib/presentation';
import { Slide } from '../../../entities/slide/model/types';
import { SlideView } from '../../../entities/slide/ui/Slide';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import { Id } from '../../../shared/model/id/Id';
import { TextButton } from '../../../shared/ui/textButton';
import { SCALE_X, SCALE_Y } from '../lib/consts';
import styles from './slideList.module.css';

type SlideListProps = {
	slideOrder: Array<Id>;
	slideList: Map<Id, Slide>;
	selectedSlides: Array<Id>;
};

export const SlideList = (props: SlideListProps) => {
	const { slideOrder, slideList, selectedSlides } = props;
	const slidesRef = useRef<HTMLDivElement>(null);
	const [slideCoords, setCoordsSlide] = useState({ x: 0, y: 0 });

	let isSelected: boolean = false;

	const slideListReactNode = slideOrder.map((id: Id, index: number) => {
		const slide = slideList.get(id);
		if (slide) {
			isSelected = false;
			if (selectedSlides.indexOf(id) >= 0) {
				isSelected = true;
			}
			const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				dispatch(clearSelectionObjs);
				if (event.ctrlKey) {
					dispatch(addSelectedSlide, index);
				} else {
					dispatch(clearSelectionSlides);
					dispatch(setSelectedSlide, index);
				}
			};
			return (
				<SlideView
					key={id}
					slide={slide}
					scaleX={SCALE_X}
					scaleY={SCALE_Y}
					isSelected={isSelected}
					slideCoords={slideCoords}
					setCoordsSlide={setCoordsSlide}
					refOnSlides={slidesRef}
					indexOfSlide={index}
					updateOrder={(from: number, to: number) => {
						dispatch(setPositionSlide, { fromIndex: from, toIndex: to });
					}}
					handleOnClick={handleOnClick}
				/>
			);
		}
	});

	return (
		<div className={styles.slideList}>
			<div className={styles.wrapper_button_add_slide}>
				<div className={styles.button_add_slide}>
					<TextButton
						onClick={() => {
							dispatch(addSlide);
							if (slideList.size == 1) {
								dispatch(setSelectedSlide, 0);
							}
						}}
						className="text_add_slide"
					>
						<p>Добавить слайд</p>
					</TextButton>
				</div>
			</div>
			<div className={styles.slideList__objs} ref={slidesRef}>
				{slideListReactNode}
			</div>
		</div>
	);
};
