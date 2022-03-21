import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";

interface Props {
	children: JSX.Element[] | JSX.Element;
	visible: boolean;
	className?: string;
	id?: string;
	backdrop?: boolean;
	onBackdropClick?: () => any;
}

export default function Modal({ children, visible, className, id, backdrop, onBackdropClick }: Props) {
	const modalRoot = useRef<Element>(document.getElementById("modal-root"));
	const [modalStyle, setModalStyle] = useState({
		transform: "translateX(100px)",
		opacity: 0,
	});
	const backdropStyle = {
		cursor: onBackdropClick ? "pointer" : "default"
	};

	useEffect(() => {
		setModalStyle({
			transform: `translateY(${visible ? "0" : "-50px"})`,
			opacity: visible ? 1 : 0,
		});
	}, [visible]);

	const modal = (
		<div className={styles.container}>
			{backdrop && <div style={backdropStyle} className={styles.backdrop} onClick={onBackdropClick}></div>}
			<div style={modalStyle} className={`${className} ${styles.modal}`} id={id}>
				{children}
			</div>
		</div>
	);

	if (modalRoot.current && visible) {
		return ReactDOM.createPortal(modal, modalRoot.current);
	}

	return null;
}
