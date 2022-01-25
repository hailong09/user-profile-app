import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import AvatarImage from "../images/avatar-svgrepo-com.svg";
import { IUser } from "../Interfaces/DataRepsInterface";

const MainPage = () => {
	const [users, setUsers] = useState<IUser[] | null>(null);
	console.log(users);
	useEffect(() => {
		(async () => {
			try {
				const resp = await axiosInstance.get("/users");
				setUsers(resp.data as IUser[]);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<div className="">
			<div className=" m-4 p-3">
				<div className="mb-3">
					<p className=" text-white text-xl">Users</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
					{users &&
						users.map((user) => (
							<Link
								to={`users/${user.id}`}
								key={user.id}
								className="text-white hover:text-indigo-500"
							>
								<div className="flex flex-col justify-center lg:flex-row lg:items-center lg:justify-start  m-2">
									<div>
										<img
											src={AvatarImage}
											alt={user.username}
											className="inline object-cover w-10 h-10  md:w-12 md:h-12 lg:w-16 lg:h-16 mr-2 rounded-full"
										/>
									</div>
									<p>{user.username}</p>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default MainPage;
