import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import {
	IPhoto,
	IComment,
	ICommentInput,
} from "../Interfaces/DataRepsInterface";
import * as Yup from "yup";

const commentSchema = Yup.object().shape({
	name: Yup.string().max(100, "Too Long!").required("Required"),
	email: Yup.string().email("Invalid Email").required("Required"),
	body: Yup.string().required("Required"),
});

const PhotoPage = () => {
	const params = useParams();
	const [open, setOpen] = useState<boolean>(false);
	const [photo, setPhoto] = useState<IPhoto | null>(null);
	const [photoComments, setPhotoComments] = useState<IComment[] | null>(null);
	const initialValues: ICommentInput = { name: "", email: "", body: "" };

	const addComment = async (values: ICommentInput) => {
		try {
			const resp = await axiosInstance.post(
				`photos/${params.photoId}/comments`,
				values
			);
			const tempComment = photoComments as IComment[];
			setPhotoComments([...tempComment, resp.data]);
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		(async () => {
			if (!params.photoId) return;

			try {
				const photoResp = await axiosInstance.get(
					`photos/${params.photoId}`
				);
				setPhoto(photoResp.data);
				const commentsResp = await axiosInstance.get(
					`photos/${params.photoId}/comments`
				);
				setPhotoComments(commentsResp.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.photoId]);
	return (
		<>
			<div className="h-screen overflow-auto bg-gray-300">
				<div className="grid grid-cols-1 lg:grid-cols-2">
					{photo && (
						<div className="shadow-lg bg-white m-2 p-4 rounded">
							<img
								className="w-full lg:h-4/5"
								src={photo.url}
								alt={photo.title}
							/>
							<div className="px-4 py-2 ">
								<p className="font-bold text-lg">
									{photo.title}
								</p>
							</div>
						</div>
					)}

					<div className="m-2 lg:h-screen lg:overflow-y-scroll overscroll-contain">
						<div className="flex justify-between p-2">
							<p className="font-medium">Comments</p>
							<button
								type="button"
								className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
								onClick={() => setOpen(true)}
							>
								Add comment
							</button>
						</div>
						{photoComments &&
							photoComments
								.sort((a, b) => b.id - a.id)
								.map((comment) => (
									<div className="bg-white rounded px-4 py-2 m-2">
										<p className="font-bold  text-lg">
											{comment.name}
										</p>
										<p className="font-medium">
											{comment.body}
										</p>
										<p className="text-indigo-500 font-medium text-right">
											{comment.email}
										</p>
									</div>
								))}
					</div>
				</div>
				<Transition appear show={open} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 z-10 overflow-y-auto"
						onClose={() => setOpen(false)}
					>
						<div className="min-h-screen px-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0" />
							</Transition.Child>

							<span
								className="inline-block h-screen align-middle"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden  text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<Formik
										initialValues={initialValues}
										validationSchema={commentSchema}
										onSubmit={(values) =>
											addComment(values)
										}
									>
										{({
											isSubmitting,
											handleBlur,
											handleChange,
											handleSubmit,
											errors,
											values,
										}) => (
											<Form>
												<Dialog.Title
													as="h3"
													className="text-lg font-medium leading-6 text-gray-900"
												>
													Add your comment
												</Dialog.Title>
												<div className="mt-2">
													<div className="my-3">
														<label>
															<p className="text-gray-500 font-medium">
																Email address:
															</p>
															<input
																disabled={
																	isSubmitting
																}
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.email
																}
																name="email"
																type="email"
																autoComplete="email"
																className="shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																required
															/>
															{errors.email && (
																<div className="text-red-500">
																	{
																		errors.email
																	}
																</div>
															)}
														</label>
													</div>
													<div className="my-3">
														<label>
															<p className="text-gray-500 font-medium">
																Name:
															</p>
															<input
																disabled={
																	isSubmitting
																}
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.name
																}
																name="name"
																type="text"
																autoComplete="name"
																className="shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																required
															/>
															{errors.name && (
																<div className="text-red-500">
																	{
																		errors.name
																	}
																</div>
															)}
														</label>
													</div>
													<div className="my-3">
														<label>
															<p className="text-gray-500 font-medium">
																Content:
															</p>
															<input
																disabled={
																	isSubmitting
																}
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.body
																}
																name="body"
																type="text"
																autoComplete="body"
																className="shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																required
															/>
															{errors.body && (
																<div className="text-red-500">
																	{
																		errors.body
																	}
																</div>
															)}
														</label>
													</div>
												</div>

												<div className="mt-4 flex justify-center">
													<button
														type="button"
														className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
														onClick={() => {
															handleSubmit();
														}}
													>
														Submit
													</button>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</div>
		</>
	);
};

export default PhotoPage;
