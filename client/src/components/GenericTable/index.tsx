import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingContext } from "@/contexts/LoadingContext";
import { IBooking, IRoom, IUser } from "@/types";
import { IResource } from "@/types/Resource.interface";
import { useContext } from "react";
import Spinner from "../Spinner";

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
  const { isLoading } = useContext(LoadingContext);

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
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Spinner />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (
          data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell className="py-3" key={col.accessor}>
                  {col.accessor === "roomName"
                    ? row.room.name
                    : row[col.accessor]}
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
