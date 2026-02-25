import { loadCourses } from "./lib/load-courses";

export default async function Home() {

    const result = await loadCourses();
    const { courses, fetchingDataFailed } = result;

    console.log("Courses:", courses);

    if (fetchingDataFailed || !courses || courses.length === 0) {

        return (
            <div className="">
                <main className="">
                    <h1>Error Loading Courses</h1>
                    <p>Sorry, we couldn't load the courses right now. Please try again later.</p>
                </main>
            </div>
        );
    }

    // If no error, render normally    
    return (
        <div className="">
            <main className="">
                <h1>Hello World</h1>
                {/* Example: Render courses if available */}
                {courses && <ul>{courses.map(course => <li key={course.guid}>{course.name}</li>)}</ul>}
            </main>
        </div>
    );
}
