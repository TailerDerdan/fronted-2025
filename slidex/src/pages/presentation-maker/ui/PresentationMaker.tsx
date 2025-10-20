import { useState } from 'react';
import { getCurrentSlide } from '../../../entities/presentation/lib/presentation';
import { Presentation } from '../../../entities/presentation/model/types';
import { Header } from '../../../widgets/header/ui/Header';
import { Sidebar } from '../../../widgets/sidebar/ui/Sidebar';
import { SlideList } from '../../../widgets/slide-list/ui/SlideList';
import { EmptyWorkspace } from '../../../widgets/workspace/ui/EmptyWorkspace';
import { Workspace } from '../../../widgets/workspace/ui/Workspace';
import styles from './presentation.module.css';

type PresentationProps = {
	pres: Presentation;
};

export const PresentationMaker = (props: PresentationProps) => {
	const { pres } = props;
	const currentSlide = getCurrentSlide(pres);
	const [isToggleOfBack, setIsToggleOfBack] = useState(false);

	let workspace;
	if (currentSlide) {
		workspace = (
			<Workspace
				slide={currentSlide}
				isToggleOfBack={isToggleOfBack}
				setIsToggleOfBack={setIsToggleOfBack}
			/>
		);
	} else {
		workspace = <EmptyWorkspace />;
	}

	console.log(isToggleOfBack);

	return (
		<div className={styles.presentation}>
			<Header name={pres.name} />

			{currentSlide ? <Sidebar currentSlide={currentSlide} isToggleOfBack={isToggleOfBack} /> : <></>}

			<div className={styles.presentation__workfield}>
				<SlideList
					slideList={pres.slideList}
					slideOrder={pres.slideOrder}
					selectedSlides={pres.selectedSlides}
				/>
				{workspace}
			</div>
		</div>
	);
};
