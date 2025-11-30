import { useContext, useRef } from 'react';
import { SlideView } from '../../../entities/slide/ui/Slide';
import { Id } from '../../../shared/model/id/Id';
import { TextButton } from '../../../shared/ui/textButton';
import { SCALE_X, SCALE_Y } from '../lib/consts';
import styles from './slideList.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { useAppSelector } from '../../../entities/presentation/model/store';
import { InfoAboutSlide } from '../../../shared/model/setterOfCoords/setterOfCoords';

export const SlideList = () => {
	const { selection, slides } = useAppSelector(state => state);
	const { slideList, slideOrder } = slides;
	const { selectedSlides } = selection;
	const slidesRef = useRef<HTMLDivElement>(null);
	const actions = useContext(PresActionContext);

	const infoSelectedSlides = useRef<Array<InfoAboutSlide>>([]);

	const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, idSlide: Id) => {
		actions?.clearSelectionObjs();
		if (event.ctrlKey) {
			actions?.addSelectedSlide(idSlide);
		} else {
			actions?.clearSelectionSlides();
			actions?.setSelectedSlide(idSlide);
		}
	};

	const slideListReactNode = slideOrder.map((id: Id) => {
		const slide = slideList[id];
		if (slide) {
			const isSelected = selectedSlides.includes(id);
			const index = slideOrder.findIndex(orderId => orderId == id);
			return (
				<SlideView
					key={id}
					slide={slide}
					scaleX={SCALE_X}
					scaleY={SCALE_Y}
					isSelected={isSelected}
					refOnSlides={slidesRef}
					indexOfSlide={index}
					idSlide={id}
					handleOnClick={handleOnClick}
					infoSelectedSlides={infoSelectedSlides}
					slideOrder={slideOrder}
				/>
			);
		}
		return null;
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
