import { ReactNode } from 'react';
import { ImageView } from '../../image/ui/image';
import { TextboxView } from '../../text-box/ui/textbox';
import { Slide } from '../model/types';
import styles from './slide.module.css';

export function getReactNodeObjs(slide: Slide | undefined): Array<ReactNode> {
	if (slide) {
		const objsOnSlide: Array<ReactNode> = slide.layersOfSlide.map((elem: string) => {
			const objOnSlide = slide.objects.get(elem);
			if (objOnSlide?.type == 'image') {
				return (
					<ImageView
						key={elem}
						type={objOnSlide.type}
						rect={objOnSlide.rect}
						src={objOnSlide.src}
					/>
				);
			}
			if (objOnSlide?.type == 'textbox') {
				return (
					<TextboxView
						key={elem}
						type={objOnSlide.type}
						texts={objOnSlide.texts}
						rect={objOnSlide.rect}
						alignment={objOnSlide.alignment}
					/>
				);
			}
		});

		return objsOnSlide;
	}
	return [];
}

type SlideProps = {
	slide: Slide;
	sequenceNum: number;
};

export const SlideView = (props: SlideProps) => {
	const { slide, sequenceNum } = props;

	const objsOnSlide = getReactNodeObjs(slide);

	return (
		<div className={styles.slide}>
			<p className={styles.slide__seqNum}>{sequenceNum}</p>
			<div className={styles.slide_objs}>{objsOnSlide}</div>
		</div>
	);
};
