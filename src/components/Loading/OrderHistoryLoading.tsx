import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function OrderHistoryLoading() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <Skeleton className="h-8 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-64" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {[...Array(3)].map((_, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="flex-grow">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24 mt-1" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-10 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                        {[...Array(4)].map((_, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center space-x-4 bg-secondary/50 p-2 rounded-md"
                          >
                            <Skeleton className="h-12 w-12 rounded-md" />
                            <div>
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-16 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
