import { Text } from "../Text";
import { Title } from "../Title";
import { SectionProps } from "./interfaces/sectionProps.interface";

export function Section({ text, title, children, variant }: SectionProps) {
  return (
    <div
      className={`
        flex justify-between border-t
        border-neutral-700 py-8
      `}
    >
      <div className="flex flex-col gap-3">
        <Title title={title} size="sm" variant={variant} />
        <Text text={text} />
      </div>

      <div
        className={`
          flex flex-col items-center gap-8
          max-w-xl w-full
        `}
      >
        {children}
      </div>
    </div>
  );
}
