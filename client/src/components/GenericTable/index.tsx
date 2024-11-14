import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableColumn = {
  header: string;
  accessor: string;
};

function GenericTable({
  columns,
  data,
}: {
  columns: TableColumn[];
  data: any[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.accessor}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell className="py-3" key={col.accessor}>
                  {row[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-3">
              Nenhum resultado encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default GenericTable;
