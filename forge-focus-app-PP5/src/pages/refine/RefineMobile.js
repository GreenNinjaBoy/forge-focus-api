import React, { useContext, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AssignmentList from '../assignments/AssignmentList';
import UserGoalSectionMobile from '../usergoals/UserGoalsSectionMobile';
import RefineArea from './RefineArea';

const RefineMobile = ( {id} ) => {
  const [keyParameters, setKeyParameters] = useState({
    refine_id: id,
    usergoal_id: '',
  })

  const { refine_id } = keyParameters;

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }

  // function copied from React bootstrap and adjusted for my requiremnts
  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <div
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontWeight: isCurrentEventKey ? 'bold' : 'normal' }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i className="fa-solid fa-angle-down"></i>
        ) : (
          <i className="fa-solid fa-angle-up"></i>
        )}
      </div>
    );
  }

  return (
    <div>
      <button aria-label="Click to return to the plan" onClick={handleBack}>
        <i className="fa-solid fa-x"></i>
      </button>

      <RefineArea id={refine_id} />

      <Accordion>
        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Day to day assignments</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <AssignmentList refine_id={refine_id} type="daytoday"/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <UserGoalSectionMobile keyParameters={keyParameters} setKeyParameters={setKeyParameters}/>
      </Accordion>
    </div>
  )
}

export default RefineMobile