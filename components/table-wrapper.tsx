'use client';

import { useSearchParams } from 'next/navigation';

import { CompactTable } from "@/components/compact-table";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchInput } from './search-input';

export function TableWrapper({ courses }: { courses: Array<any> }) {

    const pathname = usePathname();
    const router = useRouter();
    const [searchInputValue, setSearchInputValue] = useState('');

    const searchParams = useSearchParams();
    const searchQuery = searchParams && searchParams.get('search');

    const [filteredCourses, setFilteredCourses] = useState(courses);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    const handleRouter = () => {
        if (searchInputValue) return router.push(`${pathname}?search=${searchInputValue}`);
        if (!searchInputValue) return router.push('/');
    };

    useEffect(() => {
        handleRouter();
    }, [searchInputValue]);

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
            <CompactTable courses={filteredCourses} />
        </div>
    )
};