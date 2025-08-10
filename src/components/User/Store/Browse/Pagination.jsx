import { useEffect } from "react";

export default function Pagination({ location , page, totalPages, path ,onChange , setPage }) {
    
    const createPages = () => {
        const pages = [];
        pages.push(1);
        const left = Math.max(2, page - 1);
        const right = Math.min(totalPages - 1, page + 1);

        if (left > 2) pages.push("left-ellipsis");
        for (let p = left; p <= right; p++) pages.push(p);
        if (right < totalPages - 1) pages.push("right-ellipsis");

        if (totalPages > 1) pages.push(totalPages);
        return pages;
    };

    const pages = createPages();
    
    useEffect(() => {
        setPage(1)
    }, [path]);
    useEffect(() => {
        window.scrollTo(0,0)
    },[page])
    return (
        <nav className="flex items-center  justify-center gap-3 p-4" aria-label="Pagination">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className={`w-9 h-9 flex items-center justify-center rounded-full ${page === 1
                        ? "hidden"
                        : "bg-gray-800 hover:bg-gray-700 cursor-pointer text-gray-200"
                    }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <ul className="flex items-center ">
                {pages.map((p, i) =>
                    p === "left-ellipsis" || p === "right-ellipsis" ? (
                        <li key={p + i} className="text-gray-500 select-none ">…</li>
                    ) : (
                        <li key={p}>
                            <button
                                onClick={() => onChange(p)}
                                className={`px-3 cursor-pointer py-1 rounded-full text-sm ${p === page ? `bg-transparent ${location == "Admin" ? "text-gray-900" : "text-white"}` : `text-gray-400 ${location == "Admin" ? "hover:text-gray-900" : "hover:text-white"}`
                                    }`}
                            >
                                {p}
                            </button>
                        </li>
                    )
                )}
            </ul>
            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className={`w-9 h-9 flex  cursor-pointer items-center justify-center rounded-full ${page === totalPages
                        ? "hidden"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </nav>
    );
}
