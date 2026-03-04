export function TableMobileLabel({ tableHeadsLabels, currentProperty }: { tableHeadsLabels: Array<{ head: string, column: string }>, currentProperty: string }) {
    const label = tableHeadsLabels.find(label => label.column === currentProperty);

    return (label &&
        <span aria-hidden="true" className="self-center md:hidden">{label.head}</span>
    );
};