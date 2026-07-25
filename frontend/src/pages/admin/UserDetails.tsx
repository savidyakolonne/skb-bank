import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/userService";
import type { UserDetails } from "../../types/UserDetails";

export default function UserDetails() {

    const { id } = useParams();

    const [details, setDetails] =
        useState<UserDetails | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        try {

            if (!id) return;

            const data =
                await UserService.getDetails(Number(id));

            setDetails(data);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <div>Loading...</div>;

    }

    return (

        <div className="space-y-8">

            <h1 className="text-3xl font-bold">
                User Details
            </h1>

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold">
                    {details?.user.name}
                </h2>

                <p>{details?.user.email}</p>

                <p>{details?.user.username}</p>

                <p>{details?.user.role}</p>

            </div>

        </div>

    );

}