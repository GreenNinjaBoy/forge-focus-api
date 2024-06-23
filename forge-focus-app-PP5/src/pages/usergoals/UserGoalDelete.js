import React from 'react';
import { Button } from 'bootstrap';
import styles from '../../styles/UserGoalCreate.module.css';
import btnStyles from '../../styles/Button.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const UserGoalDelete = ( props ) => {
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
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const goalList = usergoals.results;

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
    <div className={styles.CreateContainer}>
      <p>Are you sure you wish to delete your goal: {title}?</p>
      <p>Deleting it will also result in all tasks within this goal being deleted too.</p>
      <div>
        <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleDelete}>
          Delete Goal
        </Button>
      </div>
    </div>
  )
}


export default UserGoalDelete