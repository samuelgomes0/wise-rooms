import { cn } from "@/lib/utils";
import Link from "next/link";

type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

type SidebarLinkProps = {
  href: string;
};

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside className={cn("border-r max-w-56", className)}>{children}</aside>
  );
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(className)}>{children}</header>;
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn(className)}>{children}</nav>;
}

export function SidebarNavList({ className, children }: SidebarGenericProps) {
  return <ul className={cn("flex flex-col gap-2", className)}>{children}</ul>;
}

export function SidebarNavListLink({
  className,
  children,
  href,
}: SidebarGenericProps<SidebarLinkProps>) {
  return (
    <Link className={cn("flex items-center gap-2", className)} href={href}>
      {children}
    </Link>
  );
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={cn("border-t m-auto", className)}>{children}</footer>
  );
}
