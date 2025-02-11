import React, { FC, useState, useEffect } from "react";

import { FiTrash2, FiCheck } from "react-icons/fi";
import { Formdata } from "@/interfaces";

type Props = {
  tasks: Formdata[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export const List: FC<Props> = ({ tasks, onComplete, onDelete }) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ul className="overflow-y-scroll max-h-[450px] mt-3 flex flex-col items-start flex-1 w-full p-3 text-white">
      {tasks.length > 0 &&
        tasks.map((item, i: number) => (
          <li
            key={item.id}
            className={`hover:border-b-green-600 cursor-pointer ${
              item.isComplete
                ? "line-through decoration-orange-600 decoration-double"
                : ""
            }  p-1 w-full border-b border-opacity-30 opacity-90 hover:opacity-50 text-start flex justify-between items-center mb-6`}
          >
            {item.task}
            <span className="flex">
              <FiCheck
                onClick={() => onComplete(item.id)}
                className="mr-3 cursor-pointer hover:text-green-600"
                data-testid="check-icon"
              />
              <FiTrash2
                onClick={() => onDelete(item.id)}
                className="cursor-pointer hover:text-red-500"
                data-testid="trash-icon"
              />
            </span>
          </li>
        ))}
    </ul>
  );
};

//line-throught --> to mark tasks done
