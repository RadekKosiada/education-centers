import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";


export function CompactTable({ courses }: { courses: Array<any> }) {
    const tableHeads = ["Name", "Start Date", "Price", "Available Spots", "Type", "District"];
    return (
        <Table className="caption-top">
            <TableCaption>VHS Courses</TableCaption>
            <TableHeader>
                <TableRow>
                    {tableHeads.map((head, index) => (
                        <TableHead key={index}>{head}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map(course => {
                    const reducedPrice = course.preis.rabatt_moeglich === 'false' || course.preis.zusatz;
                    const availableSpots = Number(course.maximale_teilnehmerzahl) - Number(course.aktuelle_teilnehmerzahl);
                    return (
                        <TableRow key={course.guid}>
                            <TableCell><Link href={'/'}>{course.name}</Link></TableCell>
                            <TableCell>{course.beginn_datum}</TableCell>
                            <TableCell>{course.preis.betrag}<br></br>{reducedPrice}</TableCell>
                            <TableCell>{availableSpots}</TableCell>
                            <TableCell>{course.veranstaltungsart}</TableCell>
                            <TableCell>{course.bezirk}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table >
    );
}
