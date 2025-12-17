import { Background } from '../../../shared/model/background/Background';
import { Color } from '../../../shared/model/color/Color';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';

type PropsSettingsBack = {
	setImageFileBack: (file: File) => void;
	background: Background;
	setBackground: (color: string) => void;
};

export const SettingsBack = (props: PropsSettingsBack) => {
	const { setImageFileBack, background, setBackground } = props;

	// const debouncedSetBackground = useCallback(
	// 	debounce((newBack: Background) => {
	// 		actions?.setBackground(newBack);
	// 	}, 500),
	// 	[actions],
	// );

	let colorOfSlide: Color = '#fff';
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
						const newBack: Background = event.target.value as Color;
						setBackground(newBack);
						// debouncedSetBackground(newBack);
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
