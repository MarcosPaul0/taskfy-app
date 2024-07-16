import { ITabProps } from "./interfaces/tabProps.interface";

export function Tab({ icon, text, isActive, ...rest }: ITabProps) {
  return (
    <button
      type="button"
      className={`
        flex items-center justify-center gap-2
        px-5 py-3 relative text-gray-50 font-semibold
        after:content=[''] after:absolute after:-bottom-px
        after:h-px after:bg-emerald-500 after:duration-300
        ${isActive ? "after:w-full" : "after:w-0"}
      `}
      {...rest}
    >
      <i className="text-gray-50 text-2xl">{icon}</i>

      {text}
    </button>
  );
}
