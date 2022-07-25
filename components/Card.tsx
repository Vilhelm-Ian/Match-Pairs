import style from "../styles/Card.module.css";
import { useState, useEffect, useMemo } from "react";
import { element } from "../pages/index";
import { CardType } from "./Types";

export default function Card(props: {
	value: string;
	clicked: [element, element];
	setClicked(arg: any): void;
	setCards(arg: any): void;
	index: number;
}) {
	const [isClicked, setIsClicked] = useState(false);
	const [isSolved, setIsSolved] = useState(false);

	let { clicked, index, setClicked, value, setCards } = props;
	let first_clicked_element = useMemo(() => clicked[1], [clicked]);

	function click(temp = 0) {
		setIsClicked((oldState) => !oldState);

		setClicked((oldState: [element, element]) => {
			let newState = [...oldState];
			for (let i = 0; i < newState.length; i++) {
				if (newState[i].value === "" && temp === 0) {
					newState[i] = { key: index, value: value };
					temp += 1;
				}
			}
			return [...newState];
		});
	}

	useEffect(() => {
		for (let i = 0; i < clicked.length; i++) {
			if (clicked[i].key === index && isClicked) {
				if (clicked[0].value === clicked[1].value) {
					setCards((oldCards: CardType[]) => {
						let newState = [...oldCards];
						newState[index].clicked = true;
						return newState;
					});

					setIsSolved(true);
				} else setTimeout(() => setIsClicked(!isClicked), 1000);
				setClicked([
					{ value: "", key: NaN },
					{ value: "", key: NaN },
				]);
			}
		}
	}, [first_clicked_element]);

	return (
		<div className={style.card}>
			<div
				onClick={() => click()}
				className={`${isClicked || isSolved ? style.card_inner_rotate : ""} ${
					style.card_inner
				}`}
			>
				<div className={style.card_front}></div>
				<div className={style.card_back}>
					<span>{props.value}</span>
				</div>
			</div>
		</div>
	);
}
