import React from 'react';
import styles from '../../styles/StepsTask.module.css';
import {axiosReq} from '../../api/axiosDefaults';
import {Link} from 'react-router-dom/cjs/react-router-dom';
import {useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';


const StepsTask = (props) => {
  const {
    id,
    name,
    image,
    context,
    today,
    achieved,
    refine,
    achieve_by_info,
    usergoal_achieve_by_info,
    type,
    activeAssignments,
    setActiveAssignments,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const handleTodayToggle = async (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      try {
        const {data} = await axiosReq.patch(`/assignment/${id}`, {today: true});
        setGlobalSuccessMessage("Assignment moved into today");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex( assignment => assignment.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      } catch(err) {
        console.log(err)
      }
    } else {
      try {
        const {data} = await axiosReq.patch(`/assignment/${id}`, {today: false});
        setGlobalSuccessMessage("Assignment removed from today");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex( assignment => assignment.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      } catch(err) {
        console.log(err)
      }
    }
  }
  const handleCompleteToggle = async (event) => {
    const checkbox = event.target;
    if (checkbox.check) {
      try {
        const {data} = await axiosReq.patch(`/assignment/${id}`, { achieved: true});
        setGlobalSuccessMessage("You have achieved your assignment well done!!");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex(taskv=> taskv.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      } catch(err) {
        console.log(err)
      }
    } else {
      try {
        const {data} = await axiosReq.patch(`/assignment/${id}`, { achieved: false});
        setGlobalSuccessMessage("Assignment has been reset!");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex(taskv=> taskv.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      } catch(err) {
        console.log(err)
      }
    }
  }

  function AchieveByContext () {
    if (achieve_by_info) {
      if (achieve_by_info.includes("OVERDUE")) {
        return <p>{achieve_by_info}</p>
      } else if (achieve_by_info.includes("TODAY") || achieve_by_info.includes("tomorrow")) {
        return <p>{achieve_by_info}</p>
      } else {
        return <p>{achieve_by_info}</p>
      }
    } else {
      return null
    }
  };

  function UserGoalAchiveByContext () {
    if (usergoal_achieve_by_info) {
      if(usergoal_achieve_by_info.includes("OVERDUE")) {
        return <p>{usergoal_achieve_by_info}</p>
      } else if (usergoal_achieve_by_info.includes("TODAY") || usergoal_achieve_by_info.includes("TOMORROW")) {
        return <p>{usergoal_achieve_by_info}</p>
      } else {
        return <p>{usergoal_achieve_by_info}</p>
      }
    } else {
      return null
    }
  };

  function LinkContext() {
    if (refine) {
      return (
        <Link to={`/refine/${refine}`}>
          <img className={styles.Image} src={image} alt='refine'/>
        </Link>
      )
    } else {
      return (
        <Link to={`/miscellaneous`}>
          <img className={styles.Image} src={image} alt='refine' />
        </Link>
      )
    }
  };
  return (
    <div className={styles.TaskContainer}>
      <div className={styles.ImageContainer}>
        <LinkContext/>
      </div>
      <div className={styles.DetailsContainer}>
        {achieved ? (
          <h3 className={styles.DetailsContainer}>{name}</h3>
        ) : (
          <h3>{name}</h3>
        )}
        <p className={styles.TaskContext}>{context}</p>
        <AchieveByContext/>
        <UserGoalAchiveByContext/>
      </div>
      <div className={styles.CheckboxContainer}>
        {type==="active" ? (
          <>
          <input type="checkbox" id={`today-${id}`} name="today" onChange={handleTodayToggle} checked={today} />
          <label htmlFor={`achieved-${id}`}>Today</label>
          {achieved? <p>DONE</p> :null}
          </>
        ) : null
        }
        {type==="today" && (
          <>
          <input type="checkbox" id={`achieved-${id}`} name="today" onChange={handleTodayToggle} />
          <label htmlFor={`achieved-${id}`}>Done</label>
          </>
        )}
        {type==="achieved" && (
          <>
          <input type="checkbox" id={`achieved-${id}`} name='today' onChange={handleCompleteToggle} checked/>
          <label htmlFor={`achieved-${id}`}>Done</label>
          </>
        )}
      </div>
    </div>
  )
}

export default StepsTask