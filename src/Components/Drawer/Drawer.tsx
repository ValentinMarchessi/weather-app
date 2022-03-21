import { createPortal } from "react-dom";
import styles from "./Drawer.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAnimations } from "../../Helpers/Hooks";

interface Props {
	active: boolean;
	children?: JSX.Element[] | JSX.Element;
	align?: "left" | "right";
	className?: string;
	id?: string;
}


export default function Drawer({ active, children, className, id }: Props) {
    //const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const drawerRoot = useRef<Element>(document.getElementById("drawer-root"));
    const expanded = useAnimations(containerRef.current?.getAnimations(), active);
    
	const container = (
        <div ref={containerRef} id={id} className={`${styles.drawer} ${className || ""}`}>
			{children}
		</div>
	);

    return (drawerRoot.current && expanded) ? createPortal(container, drawerRoot.current) : null;
}
