import React, { useEffect, useState } from 'react';
import { useCheckedUser, useCurrentUser } from '../../context/CurrentUserContext.js';
import { Button, Modal } from 'react-bootstrap';
import TakeStepsMobile from './TakeStepsMobile.js'
import TakeStepsDesktop from './TakeStepsDesktop.js'
import { axiosReq, axiosRes } from '../../api/axiosDefaults.js';
import AssignmentsActionCreate from '../assignments/AssignmentsActionCreate.js';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext.js';

const TakeSteps = () => {
  const currentUser = useCurrentUser();
  const checkedUser = useCheckedUser();

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeAssignments, setActiveAssignments] = useState({ results: []});
  const [activeList, setActiveList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [achievedList, setAchievedList] = useState([]);
  const [showModal, setShowModel] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const {data} = await axiosReq.get('/assignments/');
        setActiveAssignments(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    if (checkedUser) {
      fetchAssignments();
    }
  }, [checkedUser]);

  useEffect(() => {
    if (activeAssignments.results.length>0) {
      setActiveList(activeAssignments.results);
      setTodayList(activeAssignments.results.filter(assignment => assignment.today === true && assignment.achieved === false));
      setAchievedList(activeAssignments.results.filter(assignment => assignment.achieved === true));
    }
  }, [activeAssignments]);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  }

  const handleResetRequest = () => {
    setShowModel(true);
  };

  const handleModalClose = () => {
    setShowModel(false);
  };

  const handleReset = async () => {
    if (achievedList.length > 0){
      for (const assignment of achievedList) {
        try {
          const { id } = assignment;
          await axiosRes.delete(`/assignments/${id}`)
          setGlobalSuccessMessage("You have reset your steps board. All assignments that were complete have been deleted and everything else returned to the backlog.");
          setShowGlobalSuccess(true);
          const activeList = activeAssignments.results;
          const assignmentIndex = activeList.findIndex(assignment => assignment.id === id);
          activeList.splice(assignmentIndex, 1);
          setActiveAssignments(
            {
              results: [
                ...activeList
              ]
            }
          );
        } catch(err){
          //console.log(err);
        }
      };
    };
    if (todayList.length > 0){
      for (const assignment of todayList) {
        const { id } = assignment;
        const {data} = await axiosReq.patch(`/assignments/${id}`, { today: false });
        setGlobalSuccessMessage("You have reset your steps board. All assignments that were complete have been deleted and everything else returned to the backlog.");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex(assignment => assignment.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      };
    };
    setShowModel(false);
  };

  return (
    <div>
      {checkedUser ? (
        <>
          <div>
            <h1>Taking Steps<span>{currentUser.username}</span></h1>
          </div>
          <div>
            <Button onClick={handleOpenForm}>
              Add <span>additional </span>assignments
            </Button>
            <Button onClick={handleResetRequest}>
             Reset 
            </Button>
          </div>

          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Reset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you wish to reset "Taking Steps"?</p>
              <p>Clicking to <strong>Reset</strong> will delete any set assignments shown and move everything back into the backlog clearing today.</p>
              <p>If there are any assignments you wish to keep and repeat unclick done before clicking to reset.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleModalClose}>
                Cancel
              </Button>
              <Button onClick={handleReset}>
                Reset Taking Steps
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showForm} onHide={handleFormClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Assignments</Modal.Title>
            </Modal.Header>
            <AssignmentsActionCreate activeAssignments={activeAssignments} setActiveAssignments={setActiveAssignments} setShowForm={setShowForm}/>
          </Modal>

          <div>
            <TakeStepsMobile 
              hasLoaded={hasLoaded}
              activeAssignments={activeAssignments}
              setActiveAssignments={setActiveAssignments}
              activeList={activeList}
              todayList={todayList}
              achievedList={achievedList}
              setHasLoaded={setHasLoaded}
            />
          </div>
          <div>
            <TakeStepsDesktop 
              hasLoaded={hasLoaded}
              activeAssignments={activeAssignments}
              setActiveAssignments={setActiveAssignments}
              activeList={activeList}
              todayList={todayList}
              achievedList={achievedList}
              setHasLoaded={setHasLoaded}
            />
          </div>
        </>
      ) : (
        <div>
          Just loading your information ....
        </div>
      )}
    </div>  
  )
}

export default TakeSteps