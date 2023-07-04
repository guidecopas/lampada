import React from "react";

function Bancada(props) {
	return (
		<div className="h-screen flex justify-center items-center bg-gradient">
			<main className="w-1/2 h-3/4">
				<div className="h-full flex flex-col justify-center items-center gap-6">
					{props.children}
				</div>
			</main>
		</div>
	);
}

export default Bancada;
