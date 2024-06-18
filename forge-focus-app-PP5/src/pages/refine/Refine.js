import React from 'react';
import { useCheckedUser, useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const Refine = () => {

    const currentUser = useCurrentUser();
    const checkedUser = useCheckedUser();
    const { id } = useParams();

  return (
    <div>
        {checkedUser ? (
            <>
                <div>
                    <h1>Time to Refine {currentUser.username}</h1>
                </div>
                <div>This is for mobile refinement</div>
                <div>This is for desktop refinement</div>
            </>
        ) : (
            <div>
                Just gettign your Refinement Information ....
            </div>
        )}
    </div>
  )
}

export default Refine