import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CustomLink } from "./ui/custom-link";


export function CompactTable({ courses }: { courses: Array<any> }) {
    const tableHeadsLabels = [
        {
            head: "Name",
            column: "name"
        },
        {
            head: "Start Date",
            column: "beginn_datum"
        },
        {
            head: "Price",
            column: "preis"
        },
        {
            head: "Available Spots",
            column: "available_spots"
        },
        {
            head: "Type",
            column: "veranstaltungsart"
        },
        {
            head: "District",
            column: "bezirk"
        }
    ];
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
                    // const courseMobileLabel = tableHeadsLabels.filter(label => label.column === course
                    return (
                        <TableRow key={course.guid} className="flex flex-col md:table-row">
                            <TableCell className="flex justify-between border-b md:table-cell md:justify-normal md:border-none">
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"name"} />
                                <CustomLink href={'/'} variant="link">{course.name}</CustomLink></TableCell>
                            <TableCell className="flex justify-between border-b md:table-cell md:justify-normal md:border-none">
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"beginn_datum"} />
                                {course.beginn_datum}</TableCell>
                            <TableCell className="flex justify-between border-b md:table-cell md:justify-normal md:border-none">
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"preis"} />
                                {course.preis.betrag}<br></br>{reducedPrice}</TableCell>
                            <TableCell className="flex justify-between border-b md:table-cell md:justify-normal md:border-none">
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"available_spots"} />
                                {availableSpots}</TableCell>
                            <TableCell className="flex justify-between border-b md:table-cell md:justify-normal md:border-none">
                                <TableMobileLabel tableHeadsLabels={tableHeadsLabels} currentProperty={"veranstaltungsart"} />
                                {course.veranstaltungsart}</TableCell>
                            <TableCell className="flex justify-between border-b md:table-cell md:justify-normal md:border-none">
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

function TableMobileLabel({ tableHeadsLabels, currentProperty }: { tableHeadsLabels: Array<{ head: string, column: string }>, currentProperty: string }) {
    const label = tableHeadsLabels.find(label => label.column === currentProperty);

    return (label &&
        <span aria-hidden="true" className="self-center md:hidden">{label.head}</span>
    );
};