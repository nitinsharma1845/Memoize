import React from "react";

const NoteCard = ({title , content}) => {
  return (
    <div className="shadow-sm bg-amber-50 w-70 min-h-50 max-h-90 rounded-xl select-none p-5 cursor-pointer hover:shadow-xl">
      <h1 className="text-2xl tracking-wide mb-3">{title}</h1>
      <p className="text-sm font-light line-clamp-5">
        {content}
      </p>
    </div>
  );
};

export default NoteCard;
