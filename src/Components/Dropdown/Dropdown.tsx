import { MouseEventHandler, useState } from 'react';
import { useMountTransition } from '../../Helpers/Hooks';
import styles from './Dropdown.module.scss';

interface Props {
	element: JSX.Element;
    children: JSX.Element[] | JSX.Element;
    openOnHover?: boolean;
    className?: string;
    id?: string
}

export default function Dropdown({ element, children, openOnHover = false, className, id }: Props) {
    const [expanded, setExpanded] = useState(false);
    const hasTransitionedIn = useMountTransition(expanded, 200);

    function handleDropdown(action: "open" | "close"): MouseEventHandler<HTMLDivElement> {
		return () => setExpanded(action === "open" ? true : false);
	}

    const containerProps = {
        id: id,
		className: styles.container,
		onMouseEnter: openOnHover ? handleDropdown("open") : undefined,
	};

    const dropdownProps = {
		id: styles.dropdown,
		className: `${expanded && styles.visible} ${hasTransitionedIn && styles.in} ${className ?? ""}`,
		onMouseLeave: handleDropdown("close"),
	};

    return (
		<div {...containerProps}>
			<div id={styles.element} onClick={handleDropdown("open")}>
				{element}
			</div>
			{(expanded || hasTransitionedIn) && <div {...dropdownProps}>{children}</div>}
		</div>
	);
}