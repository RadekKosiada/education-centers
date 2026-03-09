import { CompactTable } from "@/components/compact-table";
import { NoCoursesError } from "@/components/no-courses-error";
import { SkeletonTable } from "@/components/skeleton-table";
import { Suspense } from 'react';
import { loadCourses } from "./lib/load-courses";
import Loading from "./loading";

export default async function Home() {

    const result = await loadCourses();
    const { courses, fetchingDataFailed } = result;

    if (fetchingDataFailed || !courses || courses.length === 0) {

        return (
            <NoCoursesError />
        );
    }

    // If no error, render normally    
    return (
        <Suspense fallback={<Loading />}>
            <div className="">
                <main className="">
                    <CompactTable courses={courses} />
                    <SkeletonTable courses={courses} />
                </main>
            </div>
        </Suspense>
    );
}
