import { getCurrentSlide } from '../../../entities/presentation/lib/presentation';
import { useAppSelector } from '../../../entities/presentation/model/store';
import { EmptyWorkspace } from './EmptyWorkspace';
import { Workspace } from './Workspace';

type PorpsWorkSpace = {
	isToggleOfBack: boolean;
	setIsToggleOfBack: (state: boolean) => void;
};

export const MainWorkspace = (props: PorpsWorkSpace) => {
	const { isToggleOfBack, setIsToggleOfBack } = props;
	const { selection, slides } = useAppSelector(state => state);
	const currentSlide = getCurrentSlide(selection.selectedSlides, slides.slideList);
	return (
		<>
			{currentSlide ? (
				<Workspace
					slide={currentSlide}
					isToggleOfBack={isToggleOfBack}
					setIsToggleOfBack={setIsToggleOfBack}
				/>
			) : (
				<EmptyWorkspace />
			)}
		</>
	);
};
