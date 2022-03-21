import styles from "./CardContainer.module.scss";
import React from "react";

interface CardContainerProps {
	id?: string;
	children: React.ReactNode
}

interface CardContainerState {
	refs: Element[] | HTMLElement[] | null;
}

export default class CardContainer extends React.Component<CardContainerProps, CardContainerState> {
	container: React.RefObject<HTMLDivElement>;

	constructor(props: CardContainerProps) {
		super(props);
		this.container = React.createRef();
	}

	componentDidMount() {
		if (this.container.current) {
			//this if always evaluate to true since this.container.current is defined after componentDidMount()
			let i = 0;
			for (const child of this.container.current?.children) {
				requestAnimationFrame(async () => {
					await child.animate(
						[
							{
								transform: "translateY(-40px)",
								opacity: 0,
							},
							{
								transform: "translateY(0)",
								opacity: 1,
							},
						],
						{
							delay: 100 * i++,
							duration: 500,
							easing: "ease",
							fill: "both",
						}
					).finished;
				});
			}
		}
	}
	getSnapshotBeforeUpdate() {
		let oldBox: { [reactKey: string]: { x: number; y: number } } = {};
		if (this.props.children instanceof Array)
			this.props.children.forEach((child) => {
				//forwarded refs are lost here, so getting the element by id was the last resort
				const { cardID } = child.props;
				const card = document.getElementById(cardID);
				if (card) {
					const { x, y } = card.getBoundingClientRect();
					oldBox[child.key] = { x, y };
				}
			});
		return oldBox;
	}
	componentDidUpdate(prevProps: any, currProps: any, oldBox: { [reactKey: string]: { x: number; y: number } }) {
		let newBox: { [reactKey: string]: { card: HTMLElement | Element; x: number; y: number } } = {};
		if (this.props.children instanceof Array)
			this.props.children.forEach((child) => {
				const { cardID } = child.props;
				const card = document.getElementById(cardID);
				if (card) {
					const { x, y } = card.getBoundingClientRect();
					newBox[child.key] = { card, x, y };
				}
			});
		for (const key in newBox) {
			if (key in oldBox) {
				let dx = oldBox[key].x - newBox[key].x;
				let dy = oldBox[key].y - newBox[key].y;

				requestAnimationFrame(async () => {
					await newBox[key].card.animate(
						[{ transform: `translate(${dx}px,${dy}px)` }, { transform: `translate(0)` }],
						{
							easing: "ease",
							duration: 300,
						}
					).finished;
				});
			}
		}
	}

	render() {
		return (
			<div id={this.props.id} ref={this.container} className={styles.container}>
				{this.props.children}
			</div>
		);
	}
}
