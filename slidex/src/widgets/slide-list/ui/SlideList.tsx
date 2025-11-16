import { useContext, useRef, useState } from 'react';
import { SlideView } from '../../../entities/slide/ui/Slide';
import { Id } from '../../../shared/model/id/Id';
import { TextButton } from '../../../shared/ui/textButton';
import { SCALE_X, SCALE_Y } from '../lib/consts';
import styles from './slideList.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { useAppSelector } from '../../../entities/presentation/model/store';

export const SlideList = () => {
	const { selection, slides } = useAppSelector(state => state);
	const { slideList, slideOrder } = slides;
	const { selectedSlides } = selection;
	const slidesRef = useRef<HTMLDivElement>(null);
	const [slideCoords, setCoordsSlide] = useState({ x: 0, y: 0 });
	const actions = useContext(PresActionContext);

	let isSelected: boolean = false;

	const slideListReactNode = slideOrder.map((id: Id, index: number) => {
		const slide = slideList[id];
		if (slide) {
			isSelected = false;
			if (selectedSlides.indexOf(id) >= 0) {
				isSelected = true;
			}
			const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				actions?.clearSelectionObjs();
				if (event.ctrlKey) {
					actions?.addSelectedSlide(id);
				} else {
					actions?.clearSelectionSlides();
					actions?.setSelectedSlide(id);
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
						actions?.setPositionSlide(from, to);
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
							actions?.addSlide();
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
