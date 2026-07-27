import TransactionService from "../../services/transactionService";
import type { Transaction } from "../../types/Transaction";

type Props = {
    open: boolean;
    transaction: Transaction | null;
    onClose: () => void;
};

export default function TransferSuccessModal({
    open,
    transaction,
    onClose,
}: Props) {

    if (!open || !transaction) return null;

    async function handleDownload() {

        const pdf =
            await TransactionService.downloadReceipt(transaction.id);

        const url = window.URL.createObjectURL(pdf);

        const link = document.createElement("a");

        link.href = url;
        link.download = `receipt-${transaction.id}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        ✅
                    </div>

                    <h2 className="text-2xl font-bold">
                        Transfer Successful
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Your transfer has been completed successfully.
                    </p>

                </div>

                <div className="mt-8 space-y-3">

                    <div className="flex justify-between">
                        <span>Transaction ID</span>
                        <span>{transaction.id}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Amount</span>
                        <span>
                            Rs.{" "}
                            {Number(transaction.amount).toLocaleString("en-LK", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Destination Bank</span>
                        <span>{transaction.destinationBank}</span>
                    </div>

                </div>

                <div className="mt-8 space-y-3">

                    <button
                        onClick={handleDownload}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Download Receipt
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full border py-3 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}