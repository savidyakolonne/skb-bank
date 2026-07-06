import PageHeader from "../../components/PageHeader";

export default function Profile(){
    return(
        <>
            <PageHeader
                title="My Account"
                subtitle="Manage users"
            />

            <div className=" bg-white rounded-xl shadow">
                My Account
            </div>
        </>
    );
}