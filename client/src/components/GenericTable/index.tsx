import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBooking, IRoom, IUser } from "@/types";
import { IResource } from "@/types/Resource.interface";

type TableColumn = {
  header: string;
  accessor: string;
};

function GenericTable({
  columns,
  data,
}: {
  columns: TableColumn[];
  data: IResource[] | IUser[] | IBooking[] | IRoom[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead className="text-read" key={col.accessor}>
              {col.header}
            </TableHead>
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
