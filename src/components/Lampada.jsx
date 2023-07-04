import React, { Fragment, useEffect, useState } from "react";
import LampadaApagada from "../assets/imgs/LampadaApagada.png";
import LampadaAcesa from "../assets/imgs/LampadaAcesa.png";
import LampadaQuebrada from "../assets/imgs/LampadaQuebrada.png";
import uuid from "react-uuid";

const inicialLamps = new Array(3).fill(null);

const audios = {
	acabouAsLampadas: new Audio("https://dl.sndup.net/xpkb/acabouAsLampadas.mp3"),
	barulhoInterruptor: new Audio("https://dl.sndup.net/tc4p/barulhoInterruptor.mp3"),
	lampadaQuebrando: new Audio("https://dl.sndup.net/9fyy/lampadaQuebrando.mp3"),
	novaLampada: new Audio("https://dl.sndup.net/cfft/novaLampada.mp3"),
	novoEstoque: new Audio("https://dl.sndup.net/hgd3/novoEstoque.mp3"),
};

function Lampada() {
	const [lamps, setLamps] = useState(inicialLamps);
	const [lamp, setLamp] = useState(LampadaApagada);
	const [broken, setBroken] = useState(false);
	const [state, setState] = useState(false);
	let [count, setCount] = useState(0);
	const [audioPlaying, setAudioPlaying] = useState(null);

	const reproduzirAudio = (audioName) => {
		if (audioPlaying) {
			audioPlaying.pause();
			audioPlaying.currentTime = 0;
		}
		const audio = audios[audioName];
		audio.play();
		setAudioPlaying(audio);
	};

	const reporEstoque = () => {
		reproduzirAudio("novoEstoque");
		setLamps(inicialLamps);
		setLamp(LampadaApagada);
		setBroken(false);
		setState(false);
		setCount(0);
	};

	const switchLamp = () => {
		if (state) {
			setState(false);
			setLamp(LampadaApagada);
		} else {
			setCount((prev) => ++prev);
			if (count === 9) {
				setBroken(true);
				setState(false);
				setLamp(LampadaQuebrada);
				reproduzirAudio("lampadaQuebrando");
				return;
			}
			setState(true);
			setLamp(LampadaAcesa);
		}
	};

	useEffect(() => {
		if (broken === 1) {
			setLamps((prev) => {
				const lamps = [...prev];
				const index = prev.findIndex((e) => e === null);
				lamps[index] = LampadaQuebrada;
				return lamps;
			});
			setLamp(LampadaApagada);
			reproduzirAudio("novaLampada");
			setCount(0);
			setBroken(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [broken]);

	useEffect(() => {
		if (lamps.filter((e) => e !== null).length === 3) {
			setLamp(LampadaQuebrada);
			setBroken(null);
			reproduzirAudio("acabouAsLampadas");
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lamps]);

	return (
		<Fragment>
			<div
				className={`flex flex-col justify-center items-center  ${
					broken === null && "self-center ml-0"
				}`}>
				<p className={`${broken === null ? "" : "hidden"} font-bold`}>
					Todas as lâmpadas estão quebradas
				</p>
				<div className="flex my-2 gap-5">
					{lamps.map((lamp) => (
						<img
							key={uuid()}
							src={lamp ?? LampadaApagada}
							alt="Lampada restantes"
							style={{ width: "28px" }}
						/>
					))}
				</div>
				<p className={`${broken === null && "hidden"} font-bold`}>
					Vida Util: {10 - count}
				</p>
			</div>
			{!broken && broken !== null && (
				<Fragment>
					<button
						className={`rounded-full ${
							state ? "bg-gray text-white" : "bg-blue text-black"
						} ${broken ?? "bg-green mt-3"} text-sm px-4 py-2 lg:text-lg`}
						onClick={(e) => {
							switchLamp();
							reproduzirAudio("barulhoInterruptor");
						}}>
						{state ? "Apagar Lâmpada" : "Acender Lâmpada"}
					</button>
				</Fragment>
			)}
			{broken !== null && (
				<img
					src={lamp}
					alt="Uma lâmpada"
				/>
			)}
			{broken && (
				<button
					className={`rounded-full bg-green px-6 py-2 text-black`}
					onClick={(e) => {
						setBroken(1);
					}}>
					Trocar Lâmpada
				</button>
			)}
			{broken ?? (
				<button
					className={`rounded-full bg-green px-6 py-2`}
					onClick={reporEstoque}>
					Renovar estoque
				</button>
			)}
		</Fragment>
	);
}

export default Lampada;
