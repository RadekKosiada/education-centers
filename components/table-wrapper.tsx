'use client';

import { useSearchParams } from 'next/navigation';

import { CompactTable } from "@/components/compact-table";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchInput } from './search-input';
import { TablePagination } from './table-pagination';

export function TableWrapper({ courses }: { courses: Array<any> }) {

    const router = useRouter();
    const [searchInputValue, setSearchInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState('1');

    const searchParams = useSearchParams();
    const searchQuery = searchParams && searchParams.get('search');

    const [filteredCourses, setFilteredCourses] = useState(courses);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    const handlePageNumberChange = (pageNumber: string) => {
        setCurrentPage(pageNumber);
    }

    const handleRouter = useDebouncedCallback(() => {
        // @ts-expect-error
        if (searchInputValue) return router.push(`/?page=${currentPage}&search=${searchInputValue}`, { shallow: true });
        // @ts-expect-error
        if (!searchInputValue) return router.push(`/?page=${currentPage}`, { shallow: true })
    }, 500);

    useEffect(() => {
        handleRouter();
    }, [currentPage, searchInputValue]);

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            handleRouter();
        }
    };

    useEffect(() => {
        const handleSearch = () => {
            // Filter courses based on search query
            const findCourses = courses.filter((course) => {
                if (searchQuery) {
                    return (
                        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.schlagwort.some((keyword: string) => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        course.bezirk.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                } else {
                    // If no search query, show all courses
                    return true;
                }
            });

            // Update filteredCourses based on search results
            setFilteredCourses(findCourses);
        };

        handleSearch();

    }, [searchQuery]);

    return (
        <div className="">
            <SearchInput inputValue={searchInputValue} handleKeyDown={handleSearchInputKeyDown} handleChange={handleSearchInputChange} />

            <TablePagination coursesLength={courses.length} currentPage={currentPage} handlePageNumberChange={handlePageNumberChange} />

            <CompactTable courses={filteredCourses} />
        </div>
    )
};