import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AccountService from "../../services/accountService";

export default function CreateAccount() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [accountType, setAccountType] =
        useState<"SAVINGS" | "CURRENT">("SAVINGS");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        try{

            setLoading(true);

            await AccountService.create({

                userId: Number(userId),

                accountType

            });

            toast.success("Account created!");

            navigate("/accounts");

        }catch(err:any){

            toast.error(
                err.response?.data?.message || "Failed"
            );

        }finally{

            setLoading(false);

        }

    }

    return(

        <div className="max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">

                Create Account

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white p-6 rounded-lg shadow"
            >

                <input

                    type="number"

                    placeholder="User ID"

                    value={userId}

                    onChange={(e)=>setUserId(e.target.value)}

                    className="border w-full p-3 rounded"

                />

                <select

                    value={accountType}

                    onChange={(e)=>
                        setAccountType(
                            e.target.value as "SAVINGS"|"CURRENT"
                        )
                    }

                    className="border w-full p-3 rounded"

                >

                    <option value="SAVINGS">

                        Savings

                    </option>

                    <option value="CURRENT">

                        Current

                    </option>

                </select>

                <button

                    disabled={loading}

                    className="bg-blue-600 text-white px-5 py-3 rounded"

                >

                    {loading
                        ? "Creating..."
                        : "Create Account"}

                </button>

            </form>

        </div>

    );

}