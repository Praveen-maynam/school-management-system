
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearch?: (value: string) => void;
	className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = 'Search...',
	value = '',
	onChange,
	onSearch,
	className = '',
}) => {
	const [internalValue, setInternalValue] = useState(value);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInternalValue(e.target.value);
		onChange && onChange(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && onSearch) {
			onSearch(internalValue);
		}
	};

	const handleSearchClick = () => {
		onSearch && onSearch(internalValue);
	};

	return (
		<div className={`relative flex items-center ${className}`}>
			<input
				type="text"
				className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white text-gray-800"
				placeholder={placeholder}
				value={internalValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				aria-label="Search"
			/>
			<button
				type="button"
				className="absolute left-2 text-gray-400 hover:text-blue-600 focus:outline-none"
				onClick={handleSearchClick}
				aria-label="Search"
			>
				<Search size={20} />
			</button>
		</div>
	);
};

export default SearchBar;
