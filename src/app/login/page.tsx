"use client";

import { useRouter } from "next/navigation";
import "./login-styles.css";
import { Input } from "antd";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { User } from "@/types/user";
import { useUserSession } from "@/contexts/userContext";

// Login component to handle user authentication
export default function Login() {
	// Extracts setUserSession from context to store user session data
	const { setUserSession } = useUserSession();

	const router = useRouter();

	// Track loading state during login
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState<User>({
		email: "",
		password: ""
	});

	// Handle input changes and update form data state
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle form submission, update session, and navigate to the panel page
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Show loading state
		setIsLoading(true);

		// Store user session in context and redirect to the panel.
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
					{/* Email input field */}
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
					{/* Password input field */}
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
					{/* Submit button, showing loading spinner when isLoading is true */}
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