import React from 'react';
import { useCheckedUser, useCurrentUser } from '../../context/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import AssignmentList from '../assignments/AssignmentList'


const Miscellaneous = () => {
  const currentUser = useCurrentUser();
  const checkedUser = useCheckedUser();

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }

  return (
    <div>
      {checkedUser ? (
        <>
          <div>
            <h1>{currentUser.username}'s Plan</h1>
          </div>      
          <div>
            <button aria-label="Click to return to the plan" onClick={handleBack}>
              <i className="fa-solid fa-x"></i>
            </button>
            <div>
              <img src='' alt='miscellaneous'/>
              <h2>Miscellaneous</h2>
            </div>
            <div>
              <AssignmentList type="miscellaneous"/>
            </div>
          </div>
        </>
      ) : (
        <div>
          Just loading your data ....
        </div>
      )}
    </div>  
  )
}


export default Miscellaneous