import { notFound } from "next/navigation";

export async function loadCourses() {
    let data = null;
    let fetchingDataFailed = false;
    const URL = "https://www.vhsit.berlin.de/VHSKURSE/OpenData/Kurse.json";

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
        fetchingDataFailed = true;

    }

    const courses: Array<any> = data?.veranstaltungen?.veranstaltung || [];

    return { courses, fetchingDataFailed }
}