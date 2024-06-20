import React from 'react';
import { axiosRes } from '../../api/axiosDefaults';
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
    <div>
      <p>Delete Assignment: {name}?</p>
      <div>
        <Button  onClick={handleCancel}>
          Cancel
        </Button>
        <Button  onClick={handleDelete}>
          Delete
        </Button>
      </div>
  </div>
  )
}

export default AssignmentDelete