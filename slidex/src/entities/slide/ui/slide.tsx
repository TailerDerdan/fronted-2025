import { ReactNode } from 'react';
import { ImageView } from '../../image/ui/image';
import { TextboxView } from '../../text-box/ui/textbox';
import { Slide } from '../model/types';
import styles from './slide.module.css';
import { Background } from '../../../shared/types/background/Background';
import { Id } from '../../../shared/types/id/Id';

export function getReactNodeObjs(slide: Slide | undefined, scaleX: number, scaleY: number): Array<ReactNode> {
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
						scaleX={scaleX}
						scaleY={scaleY}
						objId={elem}
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
						scaleX={scaleX}
						scaleY={scaleY}
						objId={elem}
					/>
				);
			}
		});

		return objsOnSlide;
	}
	return [];
}

export function getStyleBackground(background: Background): React.CSSProperties {
	if (background && typeof background === 'object' && 'src' in background) {
		return {
			background: `center / cover no-repeat url("${background.src}")`,
		};
	} else {
		return {
			background: background,
		};
	}
}

type SlideProps = {
	slide: Slide;
	slideId: Id;
	scaleX: number;
	scaleY: number;
};

export const SlideView = (props: SlideProps) => {
	const { slide, slideId, scaleX, scaleY } = props;

	const objsOnSlide = getReactNodeObjs(slide, scaleX, scaleY);

	const styleSlide = getStyleBackground(slide.background);

	return (
		<div className={styles.slide} onClick={() => console.log(slideId)} style={styleSlide}>
			{objsOnSlide}
		</div>
	);
};
