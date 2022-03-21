import styles from './Spinner.module.scss';

interface Props {
    className?: string;
}

export default function Spinner({className} : Props) {
    return (
		<svg id={styles.icon}>
			<circle className={className} fill="red"></circle>
		</svg>
	);
}