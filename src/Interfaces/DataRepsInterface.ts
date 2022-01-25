export interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IAlbum {
	userId: number;
	id: number;
	title: string;
}

export interface IComment {
	postId: number;
	id: number;
	email: string;
	body: string;
	name: string;
}

export interface ICommentInput {
	name: string;
	email: string;
	body: string;
}

export interface IPhoto {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}
