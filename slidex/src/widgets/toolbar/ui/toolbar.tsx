import { IconButton } from '../../../shared/ui/iconButton';
import {
	FileExportIcon,
	FileImportIcon,
	ImageIcon,
	RedoIcon,
	TextIcon,
	UndoIcon,
} from '../lib/iconComponent';
import styles from './toolbar.module.css';

export const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('create text');
					}}
					className="icon_toolbar"
					icon={<TextIcon />}
				>
					<span></span>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('create image');
					}}
					className="icon_toolbar"
					icon={<ImageIcon />}
				>
					<span></span>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('import file');
					}}
					className="icon_toolbar"
					icon={<FileImportIcon />}
				>
					<span></span>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('export file');
					}}
					className="icon_toolbar"
					icon={<FileExportIcon />}
				>
					<span></span>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('undo');
					}}
					className="icon_toolbar"
					icon={<UndoIcon />}
				>
					<span></span>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('redo');
					}}
					className="icon_toolbar"
					icon={<RedoIcon />}
				>
					<span></span>
				</IconButton>
			</div>
		</div>
	);
};
