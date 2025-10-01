import { Slide } from '../../../entities/slide/model/types';
import { SlideView } from '../../../entities/slide/ui/slide';
import { Id } from '../../../shared/types/id/Id';
import styles from './slideList.module.css';

type SlideListProps = {
	slideOrder: Array<Id>;
	slideList: Map<Id, Slide>;
};

export const SlideList = (props: SlideListProps) => {
	const { slideOrder, slideList } = props;

	const slideListReactNode = slideOrder.map((id: Id, index: number) => {
		const slide = slideList.get(id);
		if (slide) {
			return <SlideView key={id} slide={slide} sequenceNum={index} />;
		}
	});

	return (
		<div className={styles.slideList}>
			<div className={styles.slideList__objs}>{slideListReactNode}</div>
		</div>
	);
};
