import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import AvatarImage from "../images/avatar-svgrepo-com.svg";
import {
	InboxIcon,
	PhoneIcon,
	LocationMarkerIcon,
	GlobeAltIcon,
} from "@heroicons/react/solid";
import { IAlbum, IPost, IUser } from "../Interfaces/DataRepsInterface";

const UserPage = () => {
	const params = useParams();
	const [user, setUser] = useState<IUser | null>(null);
	const [userPosts, setUserPosts] = useState<IPost[] | null>(null);
	const [userAlbums, setUserAlbums] = useState<IAlbum[] | null>(null);
	useEffect(() => {
		if (!params?.userId) {
			return;
		}

		(async () => {
			try {
				const userResp = await axiosInstance.get(
					`/users/${params.userId}`
				);
				setUser(userResp.data);
				const userPostsResp = await axiosInstance.get(
					`/posts?userId=${params.userId}`
				);
				setUserPosts(userPostsResp.data);
				const userAlbumResp = await axiosInstance.get(
					`/albums?userId=${params.userId}`
				);
				setUserAlbums(userAlbumResp.data);
			} catch (error) {}
		})();
	}, [params?.userId]);
	return (
		<>
			<div className="h-screen overflow-auto bg-gradient-to-br from-rose-300 to-pink-400">
				<div className="p-5 grid grid-cols-1 gap-2 lg:grid-cols-2 max-h-sm">
					{user && (
						<div className="bg-pink-300 rounded shadow-inner flex flex-col">
							<div className="flex flex-col justify-center items-center">
								<img
									src={AvatarImage}
									alt={user.username}
									className="inline object-cover w-10 h-10  md:w-12 md:h-12 lg:w-16 lg:h-16 mt-2 rounded-full"
								/>
								<p className="font-medium m-1">{user.name}</p>
							</div>

							<div className="m-2">
								<div className="flex items-center m-2">
									<p className="font-medium text-sm">
										{user.username}
									</p>
								</div>
								<div className="flex items-center m-1">
									<GlobeAltIcon className="h-5 w-5 mr-2" />
									<p className="font-medium text-sm">
										{user.website}
									</p>
								</div>

								<div className="flex items-center m-1">
									<InboxIcon className="h-6 w-6 mr-2" />
									<p className="font-medium text-sm">
										{user.email}
									</p>
								</div>
								<div className="flex items-center m-1">
									<PhoneIcon className="h-5 w-5 mr-2" />
									<p className="font-medium text-sm">
										{user.phone}
									</p>
								</div>
								<div className="flex items-center m-1">
									<LocationMarkerIcon className="h-5 w-5 mr-2" />
									<p className="font-medium text-sm">{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
								</div>
							</div>
						</div>
					)}

					{userPosts && (
						<div className="bg-rose-300 rounded shadow-inner flex flex-col  max-h-fit">
							<p className="font-medium text-xl text-center">
								Posts
							</p>
							<ul className="py-2 px-4 flex flex-col overflow-auto ">
								{userPosts.map((post) => (
									<li key={post.id}>
										<Link
											to={`/posts/${post.id}?userId=${post.userId}`}
											className="normal-case font-medium text-sm hover:text-indigo-500"
										>
											{post.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				{userAlbums && (
					<div className="mx-4 ">
						<div className="mx-2">
							<h2 className="font-medium text-xl">Albums</h2>
						</div>
						<div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
							{userAlbums.map((album) => (
								<Link
									to={`/albums/${album.id}?userId=${album.userId}`}
									className="max-w-sm rounded shadow-lg bg-red-400 hover:bg-red-300 m-2"
								>
									<div className="px-2 py-3 lg:py-1">
										<div className="font-bold text-sm lg:text-lg">
											{album.title}
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default UserPage;
