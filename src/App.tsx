import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import AlbumPage from "./pages/AlbumPage";
import HomePage from "./pages/HomePage";
import PhotoPage from "./pages/PhotoPage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<HomePage />}></Route>
					<Route path="users/:userId" element={<UserPage />} />
					<Route path="posts/:postId" element={<PostPage />} />
					<Route path="albums/:albumId" element={<AlbumPage />} />
					<Route path="/photos/:photoId" element={<PhotoPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
