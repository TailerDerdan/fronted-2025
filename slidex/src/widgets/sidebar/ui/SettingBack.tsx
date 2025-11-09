import { setBackground } from '../../../entities/presentation/lib/presentation';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import { Background } from '../../../shared/model/background/Background';
import { Color } from '../../../shared/model/color/Color';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';

type PropsSettingsBack = {
	setImageFileBack: (file: File) => void;
	background: Background;
};

export const SettingsBack = (props: PropsSettingsBack) => {
	const { setImageFileBack, background } = props;
	let colorOfSlide: Color = Color.WHITE;
	if (typeof background != 'object') {
		colorOfSlide = background;
	}
	return (
		<>
			<div className={styles.fill_back}>
				<input
					type="color"
					value={colorOfSlide}
					onChange={event => {
						dispatch(setBackground, event.target.value);
						event.stopPropagation();
						event.preventDefault();
					}}
				/>
			</div>
			<div className={styles.image_back}>
				<SelectImageButton setSelectedImageUrlRef={setImageFileBack} />
			</div>
		</>
	);
};
