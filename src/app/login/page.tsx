"use client";

import { useRouter } from "next/navigation";
import "./login-styles.css";
import { Input } from "antd";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { User } from "@/types/user";
import { useUserSession } from "@/contexts/userContext";

export default function Login() {
	const { setUserSession } = useUserSession();

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState<User>({
		email: "",
		password: ""
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		setUserSession(formData.email);
		router.push("/panel");
	};

	return (
		<div className="login-root">
			<div className="login-content">
				<div className="login-video">
					<div className="login-text-content">
						<span className="login-video-text">Welcome to Vodafone IoT</span>
						<span className="login-video-text-light">We connect for a better future</span>
					</div>
					<video
						className="login-video-media"
						autoPlay
						loop
						muted
						playsInline
					>
						<source src="/videos/vodafone-video.mp4" type="video/mp4" />
					</video>
				</div>
				<form onSubmit={handleSubmit} className="login-right">
					<center><h1>Access Portal</h1></center><br />
					<Input
						disabled={isLoading}
						className="login-input"
						placeholder="Email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleInputChange}
						prefix={<UserOutlined className="login-input-placeholder-icon" />}
						required
					/>
					<Input
						disabled={isLoading}
						className="login-input"
						placeholder="Password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleInputChange}
						prefix={<LockOutlined className="login-input-placeholder-icon" />}
						required
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="login-button"
					>
						{isLoading ? <LoadingOutlined /> : "Login"}
					</button>
				</form>
			</div>
		</div>
	)
}