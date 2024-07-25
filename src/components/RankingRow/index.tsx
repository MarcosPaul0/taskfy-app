import { Avatar } from "../Avatar";
import { TableData } from "../Table";
import { TaskPoints } from "../../app/in-session/task-group/[taskGroupId]/tasks/components/TaskPoints";
import { RankingRowProps } from "./interfaces/rankingRowProps.interface";

export function RankingRow({
  userPlacement: { points, user },
}: RankingRowProps) {
  return (
    <tr
      className={`
        bg-neutral-800 hover:bg-neutral-700 duration-300
        h-18
      `}
    >
      <TableData>1</TableData>

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

      <TableData>{user.name}</TableData>

      <TableData>
        <TaskPoints points={points} />
      </TableData>
    </tr>
  );
}
