import React from 'react';
import { useCheckedUser, useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import RefineMobile from './RefineMobile';
import RefineDestop from './RefineDesktop';

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
                <div>
                    <RefineMobile id={id} />
                </div>
                <div>
                    <RefineDestop id={id} />
                </div>
            </>
        ) : (
            <div>
                Just getting your Refinement Information ....
            </div>
        )}
    </div>
  )
}

export default Refine