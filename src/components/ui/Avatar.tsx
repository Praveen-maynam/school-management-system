
import React from 'react';

interface AvatarProps {
	src?: string;
	alt?: string;
	size?: number;
	className?: string;
	fallback?: React.ReactNode;
}

const defaultPlaceholder = '/assets/images/avatar-placeholder.png';

const Avatar: React.FC<AvatarProps> = ({
	src,
	alt = 'User Avatar',
	size = 36,
	className = '',
	fallback,
}) => {
	const [imgError, setImgError] = React.useState(false);
	const imageSrc = !imgError && src ? src : defaultPlaceholder;

	return (
		<span
			className={`inline-block rounded-full bg-gray-200 overflow-hidden border border-gray-300 ${className}`}
			style={{ width: size, height: size }}
		>
			{(!imgError && src) || fallback ? (
				<img
					src={imageSrc}
					alt={alt}
					className="w-full h-full object-cover"
					onError={() => setImgError(true)}
				/>
			) : (
				fallback || (
					<svg
						className="w-full h-full text-gray-400"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
					</svg>
				)
			)}
		</span>
	);
};

export default Avatar;
