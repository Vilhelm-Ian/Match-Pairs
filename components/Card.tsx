import style from "../styles/Card.module.css"
import {useState} from "react"

export default function Card(props: {value: string}) {
	const [isclicked, setClicked] = useState(false)

	function rotate() {
	console.log("clicked")
	setClicked(oldState=>!oldState)
	}

	return (
  <div className={style.card}> 
		<div onClick={rotate} className={isclicked ? style.card_inner_rotate : style.card_inner}>
			<div className={style.card_front}>
			</div>
			<div className={style.card_back}>
				<span>{props.value}</span>
			</div> 
		</div>
	</div>
	)
}
