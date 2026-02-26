export function CompactList({ courses }: { courses: any[] }) {
    return (
        <ul>{courses.map(course => <li key={course.guid}>{course.name}</li>)}</ul>
    );
}

