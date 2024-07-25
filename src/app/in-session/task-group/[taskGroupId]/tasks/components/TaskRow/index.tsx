import { Avatar } from "../../../../../../../components/Avatar";
import { TableData } from "../../../../../../../components/Table";
import { TaskPoints } from "../TaskPoints";
import { TaskStatus } from "../TaskStatus";
import { TaskRowProps } from "./interfaces/taskRowProps.interface";

export function TaskRow({ task, onClick }: TaskRowProps) {
  const { title, points, dueDate, status, user } = task;

  const dueDateFormatted = new Intl.DateTimeFormat("pt-BR").format(
    new Date(dueDate),
  );

  return (
    <tr
      className={`
        bg-neutral-800 hover:bg-neutral-700 duration-300
        h-18
      `}
      role="button"
      onClick={() => onClick(task)}
    >
      <TableData align="left">{title}</TableData>

      <TableData>
        <TaskStatus status={status} />
      </TableData>

      <TableData>
        <TaskPoints points={points} />
      </TableData>

      <TableData>{dueDateFormatted}</TableData>

      <TableData>
        <Avatar
          key={user.id}
          imageUrl={user.avatarUrl}
          username={user.name}
          hasBorder={false}
          showName={false}
          size="lg"
        />
      </TableData>
    </tr>
  );
}
