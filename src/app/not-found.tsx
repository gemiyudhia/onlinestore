import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" passHref>
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
