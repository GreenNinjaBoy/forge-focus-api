import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import {Accordion, Card, Spinner} from 'react-bootstrap';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import UserGoalHighlight from '../usergoals/UserGoalHighlight';

const RefineMobileHighlight = (props) => {
  const {
    name,
    image,
    id
  } = props;

  const [userGoals, setUserGoals] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const {data} = await axiosReq.get(`/usergoals/?refine_id=${id}`);
        setUserGoals(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err);
      }
    };
    setHasLoaded(false);
    fetchUserGoals();
  }, [id]);

  // function copied from React bootstrap and adjusted for ym requirements
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
    <Card>
      <Card.Header>
        <ContextAwareToggle as={Card.Header} eventKey={id}>
          <div>
            <img src={image} alt={`${name} refine`}/>
            <h2>{name}</h2>
          </div>
        </ContextAwareToggle>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>
          <div>
            {hasLoaded ? (
              <>
                {userGoals.results.length ? (
                  userGoals.results.map( UserGoals => (
                    <UserGoalHighlight key={UserGoals.id} {...UserGoals} />
                  ))
                ) : (
                  <p>You don't have any goals set for this refinement</p>
                )}
              </>
            ) : (
              <>
                <div>
                  <Spinner animation="border" />
                  <p>We are just loading your goals</p>
                </div>
              </>
            )}
          </div>
          <div>
            <Link to={`/refine/${id}`}>
              Go to refinement
            </Link>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}


export default RefineMobileHighlight