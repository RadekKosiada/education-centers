import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export function CompactTable({ courses }: { courses: Array<any> }) {
    return (
        <Table>
            <TableCaption>VHS Courses</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available Spots</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map(course => {
                    const reducedPrice = course.preis.rabatt_moeglich === 'false' || course.preis.zusatz;
                    const availableSpots = Number(course.maximale_teilnehmerzahl) - Number(course.aktuelle_teilnehmerzahl);
                    return (
                        <TableRow key={course.guid}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.beginn_datum}</TableCell>
                            <TableCell>{course.preis.betrag}<br></br>{reducedPrice}</TableCell>
                            <TableCell>{availableSpots}</TableCell>
                            <TableCell>{course.veranstaltungsart}</TableCell>
                            <TableCell>{course.bezirk}</TableCell>
                        </TableRow>)
                })}
            </TableBody>
        </Table >
    );
}
