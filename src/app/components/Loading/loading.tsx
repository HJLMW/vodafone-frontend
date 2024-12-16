import { useState, useImperativeHandle, forwardRef } from "react";
import "./loading-styles.css";
import { LoadingOutlined } from "@ant-design/icons";

// Defining a reference interface for the Loading component
export interface LoadingRef {
	close: () => Promise<void>;  // Close function that can be called externally
}

// Props interface for the Loading component
interface LoadingProps {
	show: boolean;  // Determines whether the loading spinner is visible or not
	color?: string;  // Optional color for the spinner icon
}

// Forwarding ref to manage imperative methods (like close) from parent components
const Loading = forwardRef<any, LoadingProps>(({ show, color }, ref) => {
	// Track if the loading component is closing
	const [isClosing, setIsClosing] = useState(false);

	// Expose the close function to parent components through ref
	useImperativeHandle(ref, () => ({
		close: () => {
			return new Promise<void>((resolve) => {
				// Start closing animation
				setIsClosing(true);
				setTimeout(() => {
					// Resolve the promise after 500ms (simulating an animation delay)
					resolve();
				}, 500);
			});
		},
	}));

	return (
		<div style={{ display: show ? "block" : "none" }}>
			{/* Only render the loading spinner when "show" is true */}
			<div
				ref={ref}
				className={`loading-root ${isClosing ? "hidden" : ""} ${!show ? "hidden" : ""}`}
			>
				<LoadingOutlined
					style={{ color: color ?? "var(--primary)" }}
					className="loading-icon"
				/>
			</div>
		</div>
	);
});

export default Loading;