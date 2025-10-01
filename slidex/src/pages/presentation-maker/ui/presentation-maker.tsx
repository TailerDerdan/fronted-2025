import { getCurrentSlide } from '../../../entities/presentation/lib/presentation';
import { Presentation } from '../../../entities/presentation/model/types';
import { Header } from '../../../widgets/header/ui/header';
import { SlideList } from '../../../widgets/slide-list/ui/slideList';
import { Workspace } from '../../../widgets/workspace/ui/workspace';
import styles from './presentation.module.css';

type PresentationProps = {
	pres: Presentation;
};

export const PresentationMaker = (props: PresentationProps) => {
	const { pres } = props;
	const currentSlide = getCurrentSlide(pres);

	return (
		<div className={styles.presentation}>
			<Header name={pres.name} />
			<div className={styles.presentation__workfield}>
				<SlideList slideList={pres.slideList} slideOrder={pres.slideOrder} />
				<Workspace slide={currentSlide} />
			</div>
		</div>
	);
};
