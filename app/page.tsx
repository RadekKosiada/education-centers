import { CompactList } from "@/components/compact-list";
import { NoCoursesError } from "@/components/no-courses-error";
import { loadCourses } from "./lib/load-courses";

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
        <div className="">
            <main className="">
                <CompactList courses={courses} />
            </main>
        </div>
    );
}
