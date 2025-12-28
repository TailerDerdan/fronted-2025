import { useAppSelector } from '../../../entities/presentation/model/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './viewPres.module.css';
import { IconButton } from '../../../shared/ui/iconButton';
import { IconFullScreen } from '../lib/iconComponent';
import { exitFullscreen, openFullscreen } from '../lib/fullscreen';
import db from '../../../shared/appwrite/database';
import { getReactNodeObjs } from '../../../entities/slide/lib/getSlideObjs';

//сделать
export const ViewPres = () => {
	const [indexOfSlide, setIndexOfSlide] = useState(0);

	const [isFullscreen, setIsFullscreen] = useState(false);
	const [namePres, setNamePres] = useState('');

	const navigate = useNavigate();
	const location = useLocation();

	const { slideList, slideOrder } = useAppSelector(state => state.slides);

	const slide = slideList[slideOrder[indexOfSlide]];

	if (!slide) {
		const lastIndex = location.pathname.lastIndexOf('view');
		const newPath = location.pathname.slice(0, lastIndex - 1);

		setTimeout(() => {
			navigate(newPath);
		}, 500);

		return null;
	}

	const getNextSlide = (event: KeyboardEvent) => {
		if (
			event.key == 'ArrowRight' ||
			event.key == 'ArrowDown' ||
			event.key == 'S' ||
			event.key == 's' ||
			event.key == 'D' ||
			event.key == 'd' ||
			event.key == 'Ы' ||
			event.key == 'ы' ||
			event.key == 'В' ||
			event.key == 'в'
		) {
			if (indexOfSlide != slideOrder.length - 1) {
				setIndexOfSlide(indexOfSlide + 1);
			}
			return;
		}

		if (
			event.key == 'ArrowLeft' ||
			event.key == 'ArrowUp' ||
			event.key == 'W' ||
			event.key == 'w' ||
			event.key == 'A' ||
			event.key == 'a' ||
			event.key == 'Ц' ||
			event.key == 'ц' ||
			event.key == 'Ф' ||
			event.key == 'ф'
		) {
			if (indexOfSlide != 0) {
				setIndexOfSlide(indexOfSlide - 1);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', getNextSlide);

		return () => {
			window.removeEventListener('keydown', getNextSlide);
		};
	}, [getNextSlide]);

	const toggleFullscreen = () => {
		if (!isFullscreen) {
			openFullscreen();
		} else {
			exitFullscreen();
		}
	};

	useEffect(() => {
		const init = async () => {
			const lastIndex = location.pathname.lastIndexOf('view');
			const id = location.pathname.slice(6, lastIndex - 1);
			const row = await db['presenation'].get(id);
			setNamePres(row.title);
		};

		init();

		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	}, []);

	const [showUI, setShowUI] = useState(true);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const resetTimer = () => {
			setShowUI(true);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setShowUI(false);
			}, 1200);
		};

		window.addEventListener('mousemove', resetTimer);

		resetTimer();

		return () => {
			window.removeEventListener('mousemove', resetTimer);
			clearTimeout(timeoutId);
		};
	}, []);

	const objsOnSlide = getReactNodeObjs({
		slide,
		scaleX: 1,
		scaleY: 1,
		isSlideShow: true,
	});

	return (
		<div className={styles.slidePreview}>
			<div className={`${styles.header} ${showUI ? styles.show : styles.hide}`}>
				<button
					onClick={() => {
						const lastIndex = location.pathname.lastIndexOf('view');
						const pathToEditor = location.pathname.slice(0, lastIndex - 1);
						navigate(pathToEditor);
					}}
				>
					Назад
				</button>
				<p className={styles.namePres}>{namePres}</p>
				<div className={styles.fullScreen}>
					<IconButton
						onClick={() => {
							toggleFullscreen();
						}}
						className="icon_toolbar_present"
						icon={<IconFullScreen />}
					>
						<></>
					</IconButton>
				</div>
			</div>
			<div className={styles.workspaceContainer}>{objsOnSlide}</div>
			<div className={`${styles.pagination} ${showUI ? styles.show : styles.hide}`}>
				<div className={styles.pagination__numberSlides}>
					<button
						className={styles.pagination__button}
						onClick={() => setIndexOfSlide(prev => Math.max(0, prev - 1))}
					>
						&lt;
					</button>
					<span className={styles.pagination__number}>
						{indexOfSlide + 1}/{slideOrder.length}
					</span>
					<button
						className={styles.pagination__button}
						onClick={() => setIndexOfSlide(prev => Math.min(slideOrder.length - 1, prev + 1))}
					>
						&gt;
					</button>
				</div>
			</div>
		</div>
	);
};
