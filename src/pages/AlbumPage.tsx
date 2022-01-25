import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import { IPhoto } from "../Interfaces/DataRepsInterface";
const AlbumPage = () => {
	const params = useParams();
	const [photos, setPhotos] = useState<IPhoto[] | null>(null);
	useEffect(() => {
		(async () => {
			if (!params.albumId) return;
			try {
				const resp = await axiosInstance.get(
					`/photos?albumId=${params.albumId}`
				);
				setPhotos(resp.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.albumId]);

	return (
		<>
			<div className=" bg-gradient-to-tr from-cyan-400 to-violet-600 h-screen overflow-auto">
				{photos ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 place-items-center my-2">
						{photos.map((photo) => (
							<div key={photo.id} className="my-2">
								<Link
									to={`/photos/${photo.id}?albumId=${photo.albumId}`}
								>
									<img
										alt={photo.title}
										src={photo.thumbnailUrl}
									/>
								</Link>
							</div>
						))}
					</div>
				) : (
					<div className="flex h-screen overflow-auto items-center justify-center space-x-2 animate-bounce">
						<div className="w-4 h-4 bg-black rounded-full"></div>
						<div className="w-4 h-4 bg-black rounded-full"></div>
						<div className="w-4 h-4 bg-black rounded-full"></div>
					</div>
				)}
			</div>
		</>
	);
};

export default AlbumPage;
