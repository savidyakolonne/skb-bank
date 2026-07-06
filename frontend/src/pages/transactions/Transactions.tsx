import PageHeader from "../../components/PageHeader";

export default function Transactions(){
    return(
        <>
            <PageHeader
                title="Transactions"
                subtitle="Transaction history"
            />

            <div className=" bg-white rounded-xl p-6 shadow">
                Transactions Page
            </div>
        </>
    );
}