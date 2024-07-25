import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { ReactNode } from "react";

export interface TaskBoardProps {
  column: {
    id: string;
    title: string;
  };
  tasks: TaskResponse[];
}
