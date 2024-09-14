import { spaces } from "@/api/spaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddReservationSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione uma sala" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Salas</SelectLabel>
          {spaces.map((space) => (
            <SelectItem key={space.id} value={space.name}>
              {space.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
