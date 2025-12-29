import { useContext } from 'react';
import { createTextBox } from '../../../entities/text-box/lib/textbox';
import { createRect } from '../../../shared/model/geometry/rect/model/types';
import { IconButton } from '../../../shared/ui/iconButton';
import { FileExportIcon, RedoIcon, TextIcon, UndoIcon } from '../lib/iconComponent';
import styles from './toolbar.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { generateId } from '../../../shared/model/id/Id';
import { redo, undo } from '../../../entities/history/history';
import { ImageButton } from '../lib/ImageButton';
import jsPDF from 'jspdf';
import { DPI, slidesConvertor } from '../../../shared/lib/convertTsToPDF';
import { useAppSelector } from '../../../entities/presentation/model/store';

export const Toolbar = () => {
	const { slides, presentation } = useAppSelector(state => state);
	const actions = useContext(PresActionContext);
	return (
		<div className={styles.toolbar}>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						const newId = generateId();
						actions?.addObjOnCurrentSlide(createTextBox(createRect(500, 100, 100, 100)), newId);
						actions?.setSelectedObj(newId);
					}}
					className="icon_toolbar"
					icon={<TextIcon />}
				>
					<p className={styles.text_button_icon}>Текст</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<ImageButton />
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={async () => {
						const scaleConst = 1;
						const size = {
							width: 1920,
							height: 1080,
						};
						const doc = new jsPDF({
							orientation: 'landscape',
							unit: 'pt',
							format: [(size.width * 72) / DPI, (size.height * 72) / DPI],
						});
						await slidesConvertor(doc, slides, scaleConst, size);
						doc.save(presentation.name);
					}}
					className="icon_toolbar"
					icon={<FileExportIcon />}
				>
					<p className={styles.text_button_icon}>Экспорт в PDF</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						if (actions?.setPresState) undo(actions?.setPresState);
					}}
					className="icon_toolbar"
					icon={<UndoIcon />}
				>
					<p className={styles.text_button_icon}>Назад</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						if (actions?.setPresState) redo(actions?.setPresState);
					}}
					className="icon_toolbar"
					icon={<RedoIcon />}
				>
					<p className={styles.text_button_icon}>Вперед</p>
				</IconButton>
			</div>
		</div>
	);
};
