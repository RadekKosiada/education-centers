import { notFound } from "next/navigation"; // For 404 handling

export default async function Home() {
    let data = null;
    const URL = "https://www.vhssit.berlin.de/VHSKURSE/OpenData/Kurse.json";

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
        }

        data = await response.json();

        if (!data?.veranstaltungen?.veranstaltung || data.veranstaltungen.veranstaltung.length === 0) {
            notFound();
        }
    } catch (error) {
        console.error("Error fetching courses:", error);

        return (
            <div className="">
                <main className="">
                    <h1>Error Loading Courses</h1>
                    <p>Sorry, we couldn't load the courses right now. Please try again later.</p>
                </main>
            </div>
        );
    }

    const courses: Array<any> = data?.veranstaltungen?.veranstaltung || [];

    // If no error, render normally    
    return (
        <div className="">
            <main className="">
                <h1>Hello World</h1>
                {/* Example: Render courses if available */}
                {courses && <ul>{courses.map(course => <li key={course.guuid}>{course.name}</li>)}</ul>}
            </main>
        </div>
    );
}
