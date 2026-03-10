import { CompactTable } from "@/components/compact-table";
import { NoCoursesError } from "@/components/no-courses-error";
import { SkeletonTable } from "@/components/skeleton-table";
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
                    <CompactTable courses={courses} />

                </main>
            </div>
        </Suspense>
    );
}
