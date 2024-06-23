import React, {useContext, useEffect, useState} from 'react';
import accStyles from '../../styles/Accordion.module.css';
import styles from '../../styles/UserGoal.module.css';
import { Accordion, Card, Spinner} from 'react-bootstrap';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import UserGoalCreate from './UserGoalCreate';
import IndividualUserGoals from './IndividualUserGoals';

const UserGoalsSectionMobile = (props) => {
  const {
    keyParameters,
    setKeyParameters,
  } = props;

  const {
    refine_id
  } = keyParameters;

  const [usergoals, setUserGoals] = useState ({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fecthUserGoals = async () => {
      try {
        const {data} = await axiosReq.get(`usergoals/?refine_id=${refine_id}`);
        setUserGoals(data);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    fecthUserGoals();
  }, [refine_id]);

  // This function was copied from React bootstrap and adjusted for my requirements
  function ContextAwareToggle({ children, eventKey, callback}) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      
      <div className={accStyles.Header}
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontweight: isCurrentEventKey ? 'bold' : 'normal'}}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i className='fa-solid fa-angle-down'></i>
        ) : (
          <i className='fa-solid fa-angle-up'></i>
        )}
      </div>
    );
  }

  return (
    <>
      {hasLoaded ? (
        usergoals.results.length>0 && (
          usergoals.results.map( goal => (
            <IndividualUserGoals key={usergoals.id} refine_id={refine_id} usergoals={usergoals}  setUserGoals={setUserGoals}/>
          ))
        )
      ) : (
        <Card>
          <Card.Header>
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your goals</p>
            </div>
          </Card.Header>
        </Card>
      )}
      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="999">
            {usergoals.results.length>0 ? (
              <h3>Create a new goal</h3>
            ) : (
              <h3>Create your first goal</h3>
            )}
            
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="999">
          <Card.Body>
            <UserGoalCreate usergoals={usergoals} setUserGoals={setUserGoals} setKeyParameters={setKeyParameters} keyParameters={keyParameters}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}

export default UserGoalsSectionMobile