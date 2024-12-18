import { Input } from "@/components/ui/input";

function SearchFilter({
  searchTerm,
  setSearchTerm,
  placeholder,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
}) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      className="sm:w-full pl-10 w-0"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchFilter;
