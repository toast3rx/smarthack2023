export const Api = () => {

	const buttonClick = () => {
		console.log("Button clicked");
	}

	return (
		<div>
			<button onClick={buttonClick}> Click me </button>
		</div>
	);
}