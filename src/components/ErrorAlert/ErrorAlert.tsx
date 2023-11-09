import {AlertCircleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

interface ErrorAlertProps {
  message?: string
}

const ErrorAlert = ({message}: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className="my-8">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
