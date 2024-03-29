import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";

const CardHeader = ({ post }) => {
	const { auth, socket } = useSelector((state) => state);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleDeletePost = () => {
		if (window.confirm("Want to delete this post??")) {
			dispatch(deletePost({ post, auth, socket }));
			return history.push("/");
		}
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
	};

	return (
		<div className="card_header">
			<div className="d-flex">
				<Avatar src={post.user.avatar} size="big-avatar" />
				<div className="card_name">
					<h6 className="m-0">
						<Link to={`/profile/${post.user._id}`} className="text-light">
							{post.user.username}
						</Link>
					</h6>

					<small className="text-muted">
						{moment(post.createdAt).fromNow()}
					</small>
				</div>
			</div>

			<div className="nav-item dropdown " style={{ cursor: "pointer" }}>
				<span className="material-icons" id="moreLink" data-toggle="dropdown">
					more_horiz
				</span>

				<div className="dropdown-menu" style={{ width: "20rem" }}>
					{auth.user._id === post.user._id && (
						<>
							<div className="dropdown-item" onClick={handleDeletePost}>
								<span>Remove Post</span>
							</div>
						</>
					)}

					<div className="dropdown-item" onClick={handleCopyLink}>
						<span>Copy Link</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardHeader;
