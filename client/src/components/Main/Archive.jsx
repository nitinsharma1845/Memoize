import { ArchiveIcon } from "lucide-react";

const Archive = () => {

  return (
    <div className="w-full bg-amber-200 hover:bg-amber-300 duration-300 p-2 flex items-center gap-3">
      <span>
        <ArchiveIcon />
      </span>
      <span className="text-base font-semibold">Archived</span>
    </div>
  );
};

export default Archive;
