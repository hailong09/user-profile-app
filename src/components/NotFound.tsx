import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="h-screen flex-col flex items-center justify-center">
			<p>404 Not Found</p>
			<button
				onClick={() => {
					navigate("/");
				}}
				className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
			>
				Back to main page
			</button>
		</div>
	);
};

export default NotFound;
