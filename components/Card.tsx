import style from "../styles/Card.module.css";
import { useState, useEffect } from "react";
import {element} from "../pages/index"


export default function Card(props: {
	value: string;
	clicked: [element, element];
	setClicked(arg: any): void;
	index: number,
}) {
	const [isClicked, setIsClicked] = useState(false);
	const [isSolved, setIsSolved] = useState(false);

	useEffect(()=>{
		setIsClicked(false)
		setIsSolved(false)
	},[props.value])

	useEffect(() => {
		for(let i = 0; i<props.clicked.length; i++) {
			if(props.clicked[i].key === props.index) {
				if(props.clicked[0].value===props.clicked[1].value) setIsSolved(true)
				else setTimeout(()=>setIsClicked(!isClicked),1000)
				props.setClicked([{value: "", key: NaN}, {value: "", key: NaN}])
				console.log(props.clicked, props.value)
			}
		}
	}, [props.clicked[1]]);

   
	useEffect((temp=0)=>{
	props.setClicked((oldState: [element, element]) => {
		for (let i = 0; i < oldState.length; i++) {
			if (oldState[i].value === "" && temp === 0 && isClicked) {
				oldState[i] = {key: props.index, value: props.value }
				temp += 1;
			}
		}
		return [...oldState];
	});
	},[isClicked])


	return (
		<div className={style.card}>
			<div
			onClick={()=>setIsClicked(true)}
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
