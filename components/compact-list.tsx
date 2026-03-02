"use client";

import Link from 'next/link';

export function CompactList({ courses }: { courses: any[] }) {
    console.log("courses:", courses);
    return (
        <ul>{courses.map(course => {
            const reducedPrice = course.preis.rabatt_moeglich === 'false' || ", " + course.preis.zusatz;
            const availableSpots = Number(course.maximale_teilnehmerzahl) - Number(course.aktuelle_teilnehmerzahl);
            return (
                <li key={course.guid}>
                    {/* <Link href={`/${course.guid}`}>{course.name}</Link> */}
                    <Link href={'/'}>
                        <span>{course.name}</span>
                        <span>{course.beginn_datum}</span>
                        <span>{course.preis.betrag}{reducedPrice}</span>
                        <span><strong>{availableSpots}</strong></span>
                        <span>{course.veranstaltungsart}</span>
                        <span>{course.bezirk}</span>

                    </Link>
                </li>)
        }
        )}</ul>
    );
}

