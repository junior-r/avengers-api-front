import { CheckIcon } from "lucide-react";

type Props = {
    message: string;
};

function SuccessForm({ message }: Props) {
    return (
        <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
        >
            <CheckIcon className="shrink-0 inline w-4 h-4 me-3" />
            <p>{message}</p>
        </div>
    );
}

export default SuccessForm;
