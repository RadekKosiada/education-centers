'use client';

import { useSearchParams } from 'next/navigation';

import { CompactTable } from "@/components/compact-table";
import { useEffect, useState } from 'react';

export function TableWrapper({ courses }: { courses: Array<any> }) {

    const searchParams = useSearchParams();
    const searchQuery = searchParams && searchParams.get('search');

    const [filteredCourses, setFilteredCourses] = useState(courses);

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
            <CompactTable courses={filteredCourses} />
        </div>
    )
};