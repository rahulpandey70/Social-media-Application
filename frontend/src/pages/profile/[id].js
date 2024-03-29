import React, { useEffect } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../../images/loading.svg";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { profile, auth } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		if (profile.ids.every((item) => item !== id)) {
			dispatch(getProfileUsers({ id, auth }));
		}
	}, [profile.ids, dispatch, auth, id]);

	return (
		<div className="profile">
			<Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

			{profile.loading ? (
				<img
					className="d-block mx-auto my-4"
					src={LoadIcon}
					alt="loading"
					style={{ height: "4rem" }}
				/>
			) : (
				<Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
			)}
		</div>
	);
};

export default Profile;
