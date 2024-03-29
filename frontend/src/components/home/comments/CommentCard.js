import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
	updateComment,
	likeComment,
	unLikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [content, setContent] = useState("");
	const [readMore, setReadMore] = useState(false);
	const [isLike, setIsLike] = useState(false);
	const [onEdit, setOnEdit] = useState(false);
	const [loadLike, setLoadLike] = useState(false);
	const [onReply, setOnReply] = useState(false);

	useEffect(() => {
		setContent(comment.content);
		setIsLike(false);
		setOnReply(false);
		if (comment.likes.find((like) => like._id === auth.user._id)) {
			setIsLike(true);
		}
	}, [comment, auth.user._id]);

	const handleLike = async () => {
		if (loadLike) return;
		setIsLike(true);

		setLoadLike(true);
		await dispatch(likeComment({ comment, post, auth }));
		setLoadLike(false);
	};

	const handleUnlike = async () => {
		if (loadLike) return;
		setIsLike(false);

		setLoadLike(true);
		await dispatch(unLikeComment({ comment, post, auth }));
		setLoadLike(false);
	};

	const handleUpdate = () => {
		if (comment.content !== content) {
			dispatch(updateComment({ comment, post, content, auth }));
			setOnEdit(false);
		} else {
			setOnEdit(false);
		}
	};

	const handleReply = () => {
		if (onReply) return setOnReply(false);
		setOnReply({ ...comment, commentId });
	};

	const styleCard = {
		opacity: comment._id ? 1 : 0.5,
		pointerEvents: comment._id ? "inherit" : "none",
	};

	return (
		<div className="comment_card mt-3" style={styleCard}>
			<div className="d-flex">
				<Avatar src={comment.user.avatar} size="small-avatar" />
				<h6 className="mx-2">
					<Link to={`/profile/${comment.user._id}`} className="text-light">
						{comment.user.username}
					</Link>
				</h6>
			</div>

			<div className="comment_content">
				<div className="flex-fill overflow-hidden">
					{onEdit ? (
						<textarea
							rows="5"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					) : (
						<div>
							{comment.tag && comment.tag._id !== comment.user._id && (
								<Link to={`/profile/${comment.tag._id}`} className="mr-1">
									@{comment.tag.username}
								</Link>
							)}
							<span>
								{content.length < 100
									? content
									: readMore
									? content + " "
									: content.slice(0, 100) + "..."}
							</span>
							{content.length > 100 && (
								<span
									className="readMore"
									onClick={() => setReadMore(!readMore)}
								>
									{readMore ? "Less" : "More"}
								</span>
							)}
						</div>
					)}

					<div>
						<small className="text-muted mr-3">
							{moment(comment.createdAt).fromNow()}
						</small>

						<small
							className="font-weight-small mr-2"
							style={{ cursor: "pointer" }}
						>
							{comment.likes.length} likes
						</small>

						{onEdit ? (
							<>
								<small
									className="font-weight-bold mr-3 "
									style={{ cursor: "pointer" }}
									onClick={handleUpdate}
								>
									Update
								</small>
								<small
									className="font-weight-bold mr-3 "
									style={{ cursor: "pointer" }}
									onClick={() => setOnEdit(false)}
								>
									Cancel
								</small>
							</>
						) : (
							<small
								className="font-weight-bold mr-3 "
								style={{ cursor: "pointer" }}
								onClick={handleReply}
							>
								{onReply ? "Cancel" : "Reply"}
							</small>
						)}
					</div>
				</div>

				<div
					className="d-flex align-items-center mx-2"
					style={{ cursor: "pointer" }}
				>
					<CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
					<LikeButton
						isLike={isLike}
						handleLike={handleLike}
						handleUnlike={handleUnlike}
					/>
				</div>
			</div>

			{onReply && (
				<InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
					<Link to={`/profile/${onReply.user._id}`} className="mr-1">
						@{onReply.user.username}:
					</Link>
				</InputComment>
			)}

			{children}
		</div>
	);
};

export default CommentCard;
