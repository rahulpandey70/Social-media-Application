import { AtSign, Mail, User, X } from "lucide-react";
import { Button, InputBox } from "./common";

export const EditProfileModal = ({
	setShowEditModal,
}: {
	setShowEditModal: any;
}) => {
	return (
		<div className="z-20 top-0 right-0 md:right-28 p-2 absolute w-full md:w-[70%] flex flex-col gap-4 border border:border rounded-md bg-background transition duration-300">
			<div className="flex items-center justify-between">
				<h1 className="text-lg font-semibold text-muted-foreground">
					Edit Profile
				</h1>
				<X
					size={24}
					className="border border:border p-1 rounded-full text-muted-foreground hover:text-primary cursor-pointer"
					onClick={() => setShowEditModal((curr: any) => !curr)}
				/>
			</div>
			<div className="flex items-center justify-center gap-2">
				<div className="w-32 h-32 border border:border rounded-full"></div>
				<div className="flex flex-col gap-2">
					<Button variant={"outline"}>Change Profile</Button>
					<Button variant={"outline"}>Remove Profile</Button>
				</div>
			</div>
			<div className="w-full">
				<InputBox
					type="text"
					placeholder="Name"
					name="Name"
					disable={false}
					id="name"
					value="Rahul Pandey"
					icon=<User />
				/>
				<InputBox
					type="username"
					placeholder="Username"
					name="Username"
					disable={false}
					id="username"
					value="yourusername"
					icon=<AtSign />
				/>
				<InputBox
					type="email"
					placeholder="Email"
					name="Email"
					disable={false}
					id="email"
					value="yourgmail@something.com"
					icon=<Mail />
				/>
				<div className="flex items-center justify-center">
					<Button variant={"outline"}>Update Profile</Button>
				</div>
			</div>
		</div>
	);
};