import { useParams } from "react-router-dom";

export default function Profile(){

    const { username }=useParams();

    return(
        <div>
            <h1>{username}</h1>
        </div>
    );
}