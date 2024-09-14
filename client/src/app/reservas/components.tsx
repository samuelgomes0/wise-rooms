import { cn } from "@/lib/utils";

type DashboardGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function ReservationsPage({
  className,
  children,
}: DashboardGenericProps) {
  return (
    <div className={cn("flex flex-col w-full h-screen", className)}>
      {children}
    </div>
  );
}

export function ReservationsHeader({
  className,
  children,
}: DashboardGenericProps) {
  return (
    <header
      className={cn(
        "border-b p-6 flex justify-between items-center",
        className
      )}
    >
      {children}
    </header>
  );
}

export function ReservationsHeaderOptions({
  className,
  children,
}: DashboardGenericProps) {
  return (
    <main className={cn("flex items-center gap-10", className)}>
      {children}
    </main>
  );
}

export function ReservationsMain({
  className,
  children,
}: DashboardGenericProps) {
  return <main className={cn("p-6", className)}>{children}</main>;
}

export function ReservationsMainHeader({
  className,
  children,
}: DashboardGenericProps) {
  return (
    <header className={cn("flex items-center justify-between", className)}>
      {children}
    </header>
  );
}

export function ReservationsMainContent({
  className,
  children,
}: DashboardGenericProps) {
  return <section className={cn("", className)}>{children}</section>;
}
