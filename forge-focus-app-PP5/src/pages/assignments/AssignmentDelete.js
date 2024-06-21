import React from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/AssignmentsCreate.module.css';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';
import { Button } from 'react-bootstrap';


const AssignmentDelete = (props) => {
  const {
      id,
      name,
      assignments,
      setAssignments,
      setAssignmentState,
    } = props;
  
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  
  
    const assignmentList = assignments.results;
  
    const handleCancel = () => {
      setAssignmentState('view');
    };

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/assingments/${id}`);
        setGlobalSuccessMessage("Assignment Deleted");
        setShowGlobalSuccess(true);
        const assignmentIndex = assignmentList.findIndex(assignment => assignment.id === id);
        assignmentList.splice(assignmentIndex, 1);
        setAssignments(
          { results: [
            ...assignmentList
          ]}
        );
      } catch(err){
        //console.log(err)
      }
    };


  return (
    <div className={styles.EditContainer}>
      <p className={styles.DeleteParagraph}>Delete Assignment: {name}?</p>
      <div>
        <Button className={`${btnStyles.Button} ${styles.Button}`}  onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={`${btnStyles.Button} ${styles.Button}`}  onClick={handleDelete}>
          Delete
        </Button>
      </div>
  </div>
  )
}

export default AssignmentDelete