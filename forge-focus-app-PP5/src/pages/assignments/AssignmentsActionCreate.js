import React, {useEffect, useState} from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/AssignmentsCreate.module.css';
import {useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';


const AssignmentsActionCreate = (props) => {
  const {
    activeAssignments,
    setActiveAssignments,
    setShowForm
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const [assignmentData, setAssignmentData] = useState({
    name: '',
    refine: '',
    userGoal: '',
    achieve_by: '',
  });

  const {
    name,
    refine,
    userGoal,
    achieve_by,
  } = assignmentData;

  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadedGoals, setHasLoadedGoals] = useState(false);
  const [refinement, setRefinement] = useState({ results: []});
  const [userGoals, setUserGoals] = useState({ results: []});

  useEffect(() => {
    const fetchRefinement = async () => {
      try {
        const { data } = await axiosReq.get('/refine/');
        setRefinement(data);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
      }
    };
    fetchRefinement();
  }, []);

  useEffect(() => {
    if (refine!== '') {
      if (refine!== 'misc') {
        const fetchUserGoals = async () => {
          try {
            const {data} = await axiosReq.get(`/goals/?refine_id=${refine}`);
            setUserGoals(data);
            setHasLoadedGoals(true);
          } catch(err) {
            console.log(err)
          }
        };
        setHasLoadedGoals(false);
        fetchUserGoals();
      } else {
        setUserGoals({ results: []});
      }
    }
  }, [refine]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    if (refine) {
      if (refine!=="misc") {
        formData.append('refine', refine)
      }
    };
    if (userGoal) {
      if (userGoal!=="misc") {
        formData.append('usergoal', userGoal)
      }
    };
    if (achieve_by) {
      const parts = achieve_by.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    };
    try {
      const {data} = await axiosReq.post('/assignment/', formData);
      setGlobalSuccessMessage("New assignment created");
      setShowGlobalSuccess(true);
      const assignmentList = activeAssignments.results;
      setActiveAssignments(
        { results: [
          ...assignmentList,
          data
        ]}
      );
      setShowForm(false);
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className={styles.ActionTaskForm}>

            {errors.name?.map((message, idx) => (
              <Alert key={idx} className={formStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="name">
              <Form.Label className={styles.FormLabel}>Assignment:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task name"
                name="name"
                value={name}
                onChange={handleChange}
                className={styles.TaskInput}
              />
            </Form.Group>

            {errors.deadline?.map((message, idx) => (
              <Alert key={idx} className={formStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
            <div className={`${styles.Group} ${styles.DeadlineGroup}`}>
              <label htmlFor="achieve_by">Achieve By:</label>
              <input
                type="date"
                id="achieve_by"
                name="achieve_by"
                value={achieve_by}
                onChange={handleChange}
                className={styles.DateInput}
              />
            </div>
            <div>
              {hasLoaded ? (
                refinement.results.length>0 ? (
                  <>
                    {errors.refine?.map((message, idx) => (
                      <Alert key={idx} className={formStyles.ErrorAlert}>
                        {message}
                      </Alert>
                    ))}
                    <label htmlFor="refine">Refine area:</label>
                    <select id="refine" name="refine" onChange={handleChange}>
                      <option name="refine" value='misc'>Miscellaneous</option>
                      {refinement.results.map( refine => (
                        <option key={refine.id} value={refine.id} name="refine">{refine.name}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <p>No refinement areas present. Saving assignment will be added to miscellaneous area.</p>
                )
              ): (
                <div className={styles.SpinnerContainer}>
                  <Spinner animation="border" />
                  <p>Checking refine area</p>
                </div>
              )}
            </div>
            <div>
              {refine ? (
                hasLoadedGoals ? (
                  userGoals.results.length>0 ? (
                    <>
                      {errors.userGoal?.map((message, idx) => (
                        <Alert key={idx} className={formStyles.ErrorAlert}>
                          {message}
                        </Alert>
                      ))}
                      <label htmlFor="usergoal">Link to goal:</label>
                      <select id="usergoal" name="usergoal" onChange={handleChange}>
                        <option name="usergoal" value='misc'>Day to day assignment</option>
                        {userGoals.results.map( userGoal => (
                          <option key={userGoal.id} value={userGoal.id} name="usergoal">{userGoal.title}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    refine==="misc" ? (
                      null
                    ) : (
                      <p>No Assignments present. Saving this assignment will be added to the day to day section of refinement.</p>
                      )
                  )
                ): (
                  <div className={styles.SpinnerContainer}>
                    <Spinner animation="border" />
                    <p>Checking for assignments</p>
                  </div>
                )
              ) : null}
            </div>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} className={formStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
          </div>
          <div className={styles.Buttons}>
            <Button className={btnStyles.Button} onClick={handleFormClose}>
                Cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  )
}

export default AssignmentsActionCreate