import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AccountService from "../../services/accountService";

import type { Account } from "../../types/Account";

export default function Accounts() {

    const [accounts,setAccounts]=
        useState<Account[]>([]);

    useEffect(()=>{

        loadAccounts();

    },[]);

    async function loadAccounts(){

        const data =
            await AccountService.getAll();

        setAccounts(data);

    }

    return(

        <div>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Accounts

                </h1>

                <Link

                    to="/accounts/create"

                    className="bg-blue-600 text-white px-4 py-2 rounded"

                >

                    Create Account

                </Link>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

                {accounts.map(account=>(

                    <div

                        key={account.id}

                        className="border rounded-xl p-5 bg-white shadow"

                    >

                        <h2 className="font-bold text-xl">

                            {account.accountType}

                        </h2>

                        <p>

                            {account.accountNumber}

                        </p>

                        <p>

                            Rs. {account.balance}

                        </p>

                        <p>

                            {account.status}

                        </p>

                        <p>

                            {account.ownerName}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}