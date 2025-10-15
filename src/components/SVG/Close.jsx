const Close = ({ width = 'w-6', height = 'h-6' }) => {
    return (
        <svg
            className={`${width} ${height} text-gray-400`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
            />
        </svg>
    );
};

export default Close;
