import { XIcon } from "lucide-react";

type Props = {
    message: string;
};

function ErrorForm({ message }: Props) {
    return (
        <div
            className="flex items-center px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
        >
            <XIcon className="shrink-0 inline w-4 h-4 me-3" />
            <p>{message}</p>
        </div>
    );
}

export default ErrorForm;
