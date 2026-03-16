import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { tableHeadsLabels } from "../lib/table-categories";
import { TableMobileLabel } from "./table-mobile-label";
import { CustomLink } from "./ui/custom-link";

export function CompactTable({ courses }: { courses: Array<any> }) {

    return (
        <Table className="caption-top">
            <TableCaption>VHS Courses</TableCaption>
            <TableHeader className="sr-only md:not-sr-only">
                <TableRow>
                    {tableHeadsLabels.map(label => (
                        <TableHead key={label.column}>{label.head}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map(course => {
                    const reducedPrice = course.preis.rabatt_moeglich === 'false' || course.preis.zusatz;
                    const availableSpots = Number(course.maximale_teilnehmerzahl) - Number(course.aktuelle_teilnehmerzahl);
                    const noSpotsAvailable = availableSpots === 0;

                    let allCapsKeyword = null;

                    //  check if schlagwort is an array and find the first all caps keyword, otherwise check if it's a string and if it's all caps
                    if (course.schlagwort && Array.isArray(course.schlagwort)) {
                        allCapsKeyword = course.schlagwort.find((keyword: string) => /^[A-Z]+$/.test(keyword));
                        // check if schlagwort is a string and use it
                    } else if (course.schlagwort && typeof course.schlagwort === 'string') {
                        allCapsKeyword = course.schlagwort
                        // otherwise set it to null
                    } else {
                        allCapsKeyword = null;
                    }

                    // check if allCapsKeyword is already found, otherwise use the first element from the array, otherwise display "N/A"
                    const keyWordToDisplay = allCapsKeyword || course.schlagwort[0] || "N/A";
                    const cellClasses = "flex justify-between border-b last-of-type:border-b-0 md:last-of-type:border-b-1 md:table-cell md:justify-normal md:border-b-1";
                    return (
                        <TableRow key={course.guid} className={`flex flex-col border-4 border-b-0 last-of-type:border-t-4 last-of-type:border-b-4 md:table-row md:border-none ${noSpotsAvailable ? 'opacity-80' : ''}`}>
                            <TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"schlagwort"} />
                                {keyWordToDisplay}</TableCell>
                            < TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"name"} />
                                <CustomLink href={'/'} variant="link">
                                    {course.name}
                                </CustomLink>
                            </TableCell>
                            <TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"beginn_datum"} />
                                {formatDate(course.beginn_datum)}</TableCell>
                            <TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"preis"} />
                                <span className="text-right md:text-left">
                                    {course.preis.betrag}
                                    {reducedPrice && (
                                        <span className="">
                                            <br />
                                            {reducedPrice}
                                        </span>
                                    )}
                                </span>
                            </TableCell>
                            <TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"available_spots"} />
                                {noSpotsAvailable ? "Warteliste?" : availableSpots}</TableCell>
                            <TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"veranstaltungsart"} />
                                {course.veranstaltungsart}</TableCell>
                            <TableCell className={cellClasses}>
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"bezirk"} />
                                {course.bezirk}</TableCell>
                        </TableRow>
                    )
                })
                }
            </TableBody>
        </Table >
    );
}