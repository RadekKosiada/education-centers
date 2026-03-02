
export async function loadCourses() {
    let data = null;
    let fetchingDataFailed = false;
    const URL = "https://www.vhsit.berlin.de/VHSKURSE/OpenData/Kurse.json";

    try {
        const response = await fetch(URL, { next: { revalidate: 60 * 60 } }); // Cache for 1 hour

        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
        }

        data = await response.json();

        if (!data?.veranstaltungen?.veranstaltung || data.veranstaltungen.veranstaltung.length === 0) {
            fetchingDataFailed = true;
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        fetchingDataFailed = true;
    }

    const coursesAll: Array<any> = data?.veranstaltungen?.veranstaltung || [];
    const courses = coursesAll.slice(0, 10); // Limit to first 3 courses for testing


    return { courses, fetchingDataFailed }
}