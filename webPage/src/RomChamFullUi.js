import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Banner } from "./components/Banner";
import Ui from "./components/ui/UI"


function RomCham() {
	return (
		<div className="App">
			<NavBar />
			<Banner />
			<Home />
			<div className="mt-5">
				<Ui />
			</div>

		</div>
	);
}

export default RomCham;