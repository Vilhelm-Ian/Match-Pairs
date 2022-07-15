import style from "../styles/Card.module.css";
import { useState, useEffect } from "react";
import { element } from "../pages/index";

export default function Card(props: {
	value: string;
	clicked: [element, element];
	setClicked(arg: any): void;
	index: number;
}) {
	const [isClicked, setIsClicked] = useState(false);
	const [isSolved, setIsSolved] = useState(false);

	let { clicked, index, setClicked, value } = props;
	let first_clicked_element = clicked[1];

	useEffect(() => {
		for (let i = 0; i < clicked.length; i++) {
			if (clicked[i].key === index && isClicked) {
				if (clicked[0].value === clicked[1].value) setIsSolved(true);
				else setTimeout(() => setIsClicked(!isClicked), 1000);
				setClicked([
					{ value: "", key: NaN },
					{ value: "", key: NaN },
				]);
			}
		}
	}, [first_clicked_element]);

	useEffect(
		(temp = 0) => {
			setClicked((oldState: [element, element]) => {
				let newState = [...oldState];
				for (let i = 0; i < newState.length; i++) {
					if (newState[i].value === "" && temp === 0 && isClicked) {
						newState[i] = { key: index, value: value };
						temp += 1;
					}
				}
				return [...newState];
			});
		},
		[isClicked]
	);

	return (
		<div className={style.card}>
			<div
				onClick={() => setIsClicked(true)}
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
