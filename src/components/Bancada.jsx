import React from "react";

function Bancada(props) {
	return (
		<div className="h-screen flex justify-center items-center bg-black">
			<main className="w-1/2 h-3/4 bg-white">
				<div className="h-full flex flex-col gap-2 justify-center items-center">
					{props.children}
				</div>
			</main>
		</div>
	);
}

export default Bancada;
