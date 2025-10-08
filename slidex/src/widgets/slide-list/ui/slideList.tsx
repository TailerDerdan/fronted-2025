import { Slide } from '../../../entities/slide/model/types';
import { SlideView } from '../../../entities/slide/ui/slide';
import { Id } from '../../../shared/types/id/Id';
import { TextButton } from '../../../shared/ui/textButton';
import styles from './slideList.module.css';

type SlideListProps = {
	slideOrder: Array<Id>;
	slideList: Map<Id, Slide>;
};

export const SlideList = (props: SlideListProps) => {
	const { slideOrder, slideList } = props;

	const slideListReactNode = slideOrder.map((id: Id) => {
		const slide = slideList.get(id);
		if (slide) {
			return (
				<div key={id} className={styles.wrapper_slide}>
					<SlideView slide={slide} slideId={id} scaleX={0.201383551} scaleY={0.201383551} />
				</div>
			);
		}
	});

	return (
		<div className={styles.slideList}>
			<div className={styles.wrapper_button_add_slide}>
				<div className={styles.button_add_slide}>
					<TextButton
						onClick={() => {
							console.log('Добавить слайд');
						}}
						className="text_add_slide"
					>
						<p>Добавить слайд</p>
					</TextButton>
				</div>
			</div>
			<div className={styles.slideList__objs}>{slideListReactNode}</div>
		</div>
	);
};
