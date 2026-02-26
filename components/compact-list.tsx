"use client";

import Link from 'next/link';

export function CompactList({ courses }: { courses: any[] }) {
    console.log("courses:", courses);
    return (
        <ul>{courses.map(course =>
            <li key={course.guid}>
                {/* <Link href={`/${course.guid}`}>{course.name}</Link> */}
                <Link href={'/'}>
                    <span>{course.name}</span>
                    <span>{course.veranstaltungsart}</span>
                    <span>{course.beginn_datum}</span>
                    <span>{course.bezirk}</span>
                </Link>
            </li>
        )}</ul>
    );
}

