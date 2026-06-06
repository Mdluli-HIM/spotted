import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function EmptyState({
  icon: Icon,
  label,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[340px] items-center justify-center rounded-[30px] bg-[#f4f4f2] px-6 text-center">
      <div className="max-w-[380px]">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white text-black/40">
          <Icon size={18} />
        </span>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
          {label}
        </p>

        <h2 className="mt-3 text-[34px] font-semibold leading-[0.94] tracking-[-0.065em] text-black">
          {title}
        </h2>

        <p className="mt-4 text-[12px] leading-relaxed text-black/40">
          {description}
        </p>

        {action && <div className="mt-7">{action}</div>}
      </div>
    </div>
  );
}
