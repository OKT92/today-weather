import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex gap-2">
      <div className="grow">
        <Input
          placeholder={"Location"}
          value={value}
          onChange={onChange}
          className="bg-indigo-950/30 text-gray-50"
        />
      </div>
      <div>
        <Button onClick={onSearch}>
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
