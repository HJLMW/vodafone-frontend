import { useState, useImperativeHandle, forwardRef } from "react";
import "./loading-styles.css";
import { LoadingOutlined } from "@ant-design/icons";
export interface LoadingRef {
	close: () => Promise<void>;
}

interface LoadingProps {
	show: boolean,
	color?: string
}

const Loading = forwardRef<any, LoadingProps>(({ show, color }, ref) => {
	const [isClosing, setIsClosing] = useState(false);

	useImperativeHandle(ref, () => ({
		close: () => {
			return new Promise<void>((resolve) => {
				setIsClosing(true);
				setTimeout(() => {
					resolve();
				}, 500);
			});
		},
	}));

	return (
		<div style={{ display: show ? "block" : "none" }}>
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
