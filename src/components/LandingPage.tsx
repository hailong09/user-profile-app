import { animated, useSpring } from "react-spring";
import "../index.css";

const LandingPage = () => {
	const styles = useSpring({
		delay: 500,
		from: { opacity: 0, y: 20, overflow: "hidden" },
		to: { opacity: 1, y: 0 },
	});

	return (
		<div className="h-screen bg-gradient-to-b from-violet-600 to-violet-900">
			<div className="flex flex-col items-center justify-center h-screen">
				<animated.div style={styles}>
					<div className="bg-transparent relative">
						<h1 className="absolute -inset-0.5 blur-sm font-title text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-red-500">
							WELCOME
						</h1>

						<h1 className=" relative drop-shadow-md font-title text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-red-500">
							WELCOME
						</h1>
					</div>
				</animated.div>
				<animated.div style={styles}>
					<p className="font-thin text-white m-3">
						Scroll down to see all available users you can interact.
					</p>
				</animated.div>
			</div>
		</div>
	);
};

export default LandingPage;
