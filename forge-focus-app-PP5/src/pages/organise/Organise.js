import React from "react";
import OrganiseDetails from "./OrganiseDetails";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCheckedUser, useCurrentUser } from "../../context/CurrentUserContext";

const Organise = () => {

    const currentUser = useCurrentUser();
    const checkedUser = useCheckedUser();

    return (
    <div>
      {checkedUser ? (
        <>
          <div>
            <h1>{currentUser.username}'s Plan</h1>
          </div>      
          <div>
            <Link to={'/refine/create'}>
              Create new refinement
            </Link>
          </div>
          <div >
            <OrganiseDetails mobile />
          </div>
          <div>
            <OrganiseDetails />
          </div>
        </>
      ) : (
        <div>
          Just fetching you data.........
        </div>
      )}
    </div>
  )
}

export default Organise