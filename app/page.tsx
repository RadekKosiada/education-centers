import { NoCoursesError } from "@/components/no-courses-error";
import { SearchInput } from "@/components/search-input";
import { SkeletonTable } from "@/components/skeleton-table";
import { TableWrapper } from "@/components/table-wrapper";
import { Suspense } from 'react';
import { loadCourses } from "./lib/load-courses";

export default async function Home() {

    const result = await loadCourses();
    const { courses, fetchingDataFailed } = result;

    if (fetchingDataFailed || !courses || courses.length === 0) {

        return (
            <NoCoursesError />
        );
    }

    return (
        <Suspense fallback={<SkeletonTable />}>
            <div className="">
                <main className="">
                    <SearchInput />
                    <TableWrapper courses={courses} />

                </main>
            </div>
        </Suspense>
    );
}
