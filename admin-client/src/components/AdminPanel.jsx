import { useEffect } from "react";
import { getAuth } from "../util/authStorage";
import { useNavigate } from "react-router-dom";

function AdminPanel(){
    const navigate = useNavigate();

    useEffect(() => {
        if(!getAuth().isAdmin) navigate('/');
    })

    return(
        <>
            <div className="header">
                <button>New Post</button>
                <button>Show Drafts</button>
            </div>

            <div className="post-list">
                list of post titles, together with date and published status
            </div>
        </>
    )
}

export default AdminPanel;