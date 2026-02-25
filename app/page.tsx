import { NoCoursesError } from "@/components/no-courses-error";
import { loadCourses } from "./lib/load-courses";

export default async function Home() {

    const result = await loadCourses();
    const { courses, fetchingDataFailed } = result;

    console.log("Courses:", courses);

    if (fetchingDataFailed || !courses || courses.length === 0) {

        return (
            <NoCoursesError />
        );
    }

    // If no error, render normally    
    return (
        <div className="">
            <main className="">
                {courses && <ul>{courses.map(course => <li key={course.guid}>{course.name}</li>)}</ul>}
            </main>
        </div>
    );
}
