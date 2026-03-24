'use client';

import { CompactTable } from "@/components/compact-table";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SearchInput } from './search-input';
import { TablePagination } from './table-pagination';

export function TableWrapper({ courses }: { courses: Array<any> }) {
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    const rowsPerPage = 10;
    const [searchInputValue, setSearchInputValue] = useState(searchParams.get('search') ?? '');
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1');

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
        setCurrentPage('1');
    };

    const updateUrl = (search: string, page: string) => {
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (Number(page) > 1) params.set('page', page);
        const query = params.toString();
        // @ts-expect-error
        router.push(`${path}${query ? `?${query}` : ''}`, { shallow: true });
    };

    useEffect(() => {
        updateUrl(searchInputValue, currentPage);
    }, [searchInputValue, currentPage]);

    const filteredCoursesSearch = useMemo(() => {
        const query = searchInputValue.trim().toLowerCase();
        if (!query) return courses;
        return courses.filter((course) =>
            course.name.toLowerCase().includes(query) ||
            course.bezirk.toLowerCase().includes(query) ||
            course.schlagwort.some((k: string) => k.toLowerCase().includes(query))
        );
    }, [courses, searchInputValue]);

    const filteredCoursesPage = useMemo(() => {
        const page = Math.max(1, Number(currentPage || '1'));
        const start = (page - 1) * rowsPerPage;
        return filteredCoursesSearch.slice(start, start + rowsPerPage);
    }, [filteredCoursesSearch, currentPage]);

    return (
        <div>
            <SearchInput
                inputValue={searchInputValue}
                handleChange={handleSearchInputChange}
                handleKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setCurrentPage('1'); } }}
            />
            <TablePagination
                coursesLength={filteredCoursesSearch.length}
                currentPage={currentPage}
                handlePageNumberChange={setCurrentPage}
            />
            <CompactTable courses={filteredCoursesPage} />
        </div>
    );
}