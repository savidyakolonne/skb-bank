import { useParams } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";


export default function Profile(){

    const { username } = useParams();

    const { user } = useAuth();


    return (

        <div className="min-h-screen bg-slate-100 p-8">


            {/* Profile Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    {user?.name}
                </h1>

                <p className="text-gray-500">
                    @{username}
                </p>

            </div>



            {/* Bank Card */}

            <div className="
                max-w-xl
                bg-gradient-to-br 
                from-blue-700 
                to-indigo-900
                text-white
                rounded-3xl
                p-8
                shadow-xl
                mb-8
            ">


                <div className="flex justify-between items-center">


                    <div>

                        <p className="text-blue-200 text-sm">
                            SKB BANK
                        </p>

                        <h2 className="text-2xl font-bold">
                            Digital Banking Card
                        </h2>

                    </div>


                    <CreditCard size={45}/>


                </div>



                <div className="mt-10">

                    <p className="text-blue-200 text-sm">
                        Account Number
                    </p>


                    <h3 className="text-3xl tracking-widest font-semibold">
                        SKB 3378 2941 3
                    </h3>


                </div>



                <div className="flex justify-between mt-8">


                    <div>

                        <p className="text-blue-200 text-sm">
                            Account Holder
                        </p>

                        <p className="font-semibold">
                            {user?.name}
                        </p>

                    </div>



                    <div>

                        <p className="text-blue-200 text-sm">
                            Account Type
                        </p>

                        <p className="font-semibold">
                            Savings
                        </p>

                    </div>


                </div>


            </div>



            {/* User Information */}


            <div className="
                bg-white 
                rounded-2xl 
                shadow 
                p-6 
                max-w-xl
            ">


                <h2 className="text-xl font-semibold mb-5">
                    Personal Information
                </h2>



                <div className="space-y-4">


                    <div>

                        <p className="text-gray-500 text-sm">
                            Full Name
                        </p>

                        <p className="font-medium">
                            {user?.name}
                        </p>

                    </div>



                    <div>

                        <p className="text-gray-500 text-sm">
                            Username
                        </p>

                        <p className="font-medium">
                            {username}
                        </p>

                    </div>



                    <div>

                        <p className="text-gray-500 text-sm">
                            Email
                        </p>

                        <p className="font-medium">
                            {user?.email}
                        </p>

                    </div>



                    <div>

                        <p className="text-gray-500 text-sm">
                            Account Status
                        </p>

                        <p className="
                            text-green-600
                            font-semibold
                        ">
                            Active
                        </p>

                    </div>


                </div>


            </div>


        </div>

    );
}