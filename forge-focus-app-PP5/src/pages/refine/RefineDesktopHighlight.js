import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { Spinner } from 'react-bootstrap';
import UserGoalHighlight from '../usergoals/UserGoalHighlight';


const RefineDesktopHighlight = (props) => {
  const {
    name,
    why,
    image,
    id,
  } = props;

  const [userGoals, setUserGoals] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const {data} = await axiosReq.get(`/goals/?refine_id=${id}`);
        setUserGoals(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    fetchUserGoals();
  }, [id]);
  
  return (
    <div>
    <div>
      <img src={image} alt={`${name} refine`}/>
      <div>
        <h2>{name}</h2>
        <p>{why}</p>
      </div>
    </div>
    <div>
      {hasLoaded ? (
        <>
          {userGoals.results.length ? (
            userGoals.results.map(userGoals => (
              <UserGoalHighlight key={userGoals.id} {...userGoals} />
            ))
          ) : (
            <div>
              <p>You don't have any goals set for this refinement.</p>
            </div>
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
  </div>
  )
}

export default RefineDesktopHighlight