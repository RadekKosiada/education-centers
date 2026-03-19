'use client';


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

    // const searchParams = useSearchParams();
    // const searchQuery = searchParams && searchParams.get('search');

    const [filteredCoursesSearch, setFilteredCoursesSearch] = useState(courses);
    const [filteredCoursesPage, setFilteredCoursesPage] = useState(filteredCoursesSearch);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    const handlePageNumberChange = (pageNumber: string) => {
        setCurrentPage(pageNumber);
    };

    const handleRouter = useDebouncedCallback(() => {
        // @ts-expect-error
        if (searchInputValue) return router.push(`/?page=${currentPage}&search=${searchInputValue}`, { shallow: true });
        // @ts-expect-error
        if (!searchInputValue) return router.push(`/?page=${currentPage}`, { shallow: true })
    }, 500);

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            handleRouter();
        }
    };

    const filterCoursesAccordingToCurrentPage = () => {
        const findCourses = filteredCoursesSearch.filter((course, index) => {
            if (Number(currentPage) === 1) {
                return index < 10;
            } else {
                return index >= (Number(currentPage) - 1) * 10 && index < Number(currentPage) * 10;
            }
        });

        setFilteredCoursesPage(findCourses);
    };

    useEffect(() => {
        handleRouter();
        filterCoursesAccordingToSearchTerm();
        filterCoursesAccordingToCurrentPage();
    }, [currentPage, searchInputValue]);

    const filterCoursesAccordingToSearchTerm = () => {
        const findCourses = courses.filter((course) => {
            if (searchInputValue) {
                return (
                    course.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
                    course.schlagwort.some((keyword: string) => keyword.toLowerCase().includes(searchInputValue.toLowerCase())) ||
                    course.bezirk.toLowerCase().includes(searchInputValue.toLowerCase())
                );
            } else {
                // If no searchInput, show all courses
                return true;
            }
        });

        setFilteredCoursesSearch(findCourses);
    };


    return (
        <div className="">
            <SearchInput inputValue={searchInputValue} handleKeyDown={handleSearchInputKeyDown} handleChange={handleSearchInputChange} />

            <TablePagination coursesLength={courses.length} currentPage={currentPage} handlePageNumberChange={handlePageNumberChange} />

            <CompactTable courses={filteredCoursesPage} />
        </div>
    )
};