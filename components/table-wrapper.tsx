'use client';

import { CompactTable } from "@/components/compact-table";
import { rowsPerPage } from '@/lib/table-categories';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SearchInput } from './search-input';
import { TablePagination } from './table-pagination';

export function TableWrapper({ courses }: { courses: Array<any> }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname();
    // const searchQuery = searchParams && searchParams.get('search');

    const [searchInputValue, setSearchInputValue] = useState(searchParams.get('search') ?? '');
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1');
    const debounce = 500;

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
        setCurrentPage('1');
    };

    const handlePageNumberChange = (pageNumber: string) => {
        setCurrentPage(pageNumber);
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
        return courses.filter((course) => {
            course.name.toLowerCase().includes(query) ||
                course.bezirk.toLowerCase().includes(query) ||
                course.schlagwort.some((keyword: string) => keyword.toLowerCase().includes(query));
        });
    }, [searchInputValue, courses]);

    const filteredCoursesPage = useMemo(() => {
        const page = Math.max(1, Number(currentPage));
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return filteredCoursesSearch.slice(startIndex, endIndex);
    }, [currentPage, filteredCoursesSearch]);

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCurrentPage('1');
        }
    };

    return (
        <div className="">
            <SearchInput inputValue={searchInputValue} handleKeyDown={handleSearchInputKeyDown} handleChange={handleSearchInputChange} />

            <TablePagination coursesLength={filteredCoursesSearch.length} currentPage={currentPage} handlePageNumberChange={handlePageNumberChange} />

            <CompactTable courses={filteredCoursesPage} />
        </div>
    )
};