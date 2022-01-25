import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import LandingPage from "../components/LandingPage";
import MainPage from "../components/MainPage";
const HomePage = () => {
	return (
		<div>
			<Parallax pages={2} className="bg-violet-900">
				<ParallaxLayer offset={0} speed={2.5} factor={0.3}>
					<LandingPage />
				</ParallaxLayer>
				<ParallaxLayer
					offset={1}
					speed={-0.01}
					className="bg-gradient-to-b from-violet-900 to-pink-400"
				/>
				<ParallaxLayer offset={1} speed={0.5} >
					<MainPage />
				</ParallaxLayer>
			</Parallax>
		</div>
	);
};

export default HomePage;
