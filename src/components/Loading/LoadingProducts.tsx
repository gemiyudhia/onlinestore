import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* ProductFilter skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* ProductList skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-4">
              <Skeleton className="h-48 w-full rounded-md" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
