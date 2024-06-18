import React from 'react';
import { Button } from 'bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useGlobalSuccessMessage, useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

function UserGoalDelete() {
  const {
    id,
    title,
    usergoals,
    setUserGoals,
    setUserGoalsState,
    setKeyParameters,
    KeyParameters
  } = props

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useGlobalSuccessMessage();

  const goalList = userGoals.results;

  const handleCancel = async () => {
    setUserGoalsState('view');
  };
    
  const handleDelete = async () =>  {
    try {
      await axiosReq.delete(`/usergoals/${id}`);
      setGlobalSuccessMessage("Your goal has been deleted");
      setShowGlobalSuccess(true);
      const goalIndex = goalList.findIndex(goal => usergoals.id === id);
      goalList.splice(goalIndex, 1);
      if (KeyParameters) {
        setKeyParameters({
          ...KeyParameters,
          userGoal_id: "",
        });
      }
      setUserGoals(
        { results: [
          ...goalList
        ]}
      );
      setUserGoalsState("view")
    } catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <p>Are you sure you wish to delete your goal: {title}?</p>
      <p>Deleting it will also result in all tasks within this goal being deleted too.</p>
      <div>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleDelete}>
          Delete Goal
        </Button>
      </div>
    </div>
  )
}


export default UserGoalDelete