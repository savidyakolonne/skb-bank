import { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";

import accountService from "../../services/accountService";

import type { Account } from "../../types/Account";

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      const data = await accountService.getAll();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <PageHeader
        title="Accounts"
        subtitle="Manage bank accounts"
      />

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-4">
                Number
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Balance
              </th>

              <th className="text-left p-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {accounts.map((account) => (

              <tr key={account.id}>

                <td className="p-4">
                  {account.accountNumber}
                </td>

                <td className="p-4">
                  {account.accountType}
                </td>

                <td className="p-4">
                  Rs. {account.balance}
                </td>

                <td className="p-4">
                  {account.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}