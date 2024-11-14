import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Skeleton className="rounded-full w-12 h-12" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
