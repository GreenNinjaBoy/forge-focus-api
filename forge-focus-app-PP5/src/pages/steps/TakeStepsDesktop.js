import React, {useEffect, useState} from 'react';
import StepsTask from './StepsTask';
import { Form, Spinner } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

const TakeStepsDesktop = (props) => {
  const {
    hasLoaded,
    activeAssignments,
    setActiveAssignments,
    activeList,
    todayList,
    achievedList,
    setHasLoaded
  } = props;

  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState({ results: []});

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (query !== ""){
      const updateSearchList = async () => {
        try {
          setHasLoaded(false);
          const {data} = await axiosReq.get(`/assingments/?search=${query}`);
          setSearchList(data);
          setHasLoaded(true);
        }  catch(err) {
          //console.log(err)
        }
      };
      // Below sets fetchPosts to fire after a 1 second pause
      const timer = setTimeout(() => {
        updateSearchList();
      }, 1000)
      // Below cleans up and clears the timeout function
      return () => {
        clearTimeout(timer)
      }
    } else {
      setSearchList({ results: []});
    }
  }, [query, setHasLoaded])

  useEffect(() => {
    const changeActiveAssignmentsOrder = async () => {
      try {
        const {data} = await axiosReq.get(`/assignments/${filter}`);
        setActiveAssignments(data);
        setHasLoaded(true);
      }  catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    changeActiveAssignmentsOrder();
  }, [filter, setActiveAssignments, setHasLoaded])

  return (
    <div>

      <div>
        <div>
          <h2>Still to Complete</h2>
          <div>
            <Form onSubmit={(event) => event.preventDefault()}>
              <Form.Control
                type="text"
                placeholder="Search assignments"
                value={query}
                onChange={(event) => setQuery(event.target.value)}/>
            </Form>
          </div>
          <div>
            <label htmlFor="filter">Order by:</label>
            <select id="filter" name="filter" onChange={handleFilter}>
              <option name="filter" value='?ordering=achieve_by'>Assignment deadline</option>
              <option name="filter" value='?ordering=-refine'>Refine Area</option>
              <option name="filter" value='?ordering=usergoal__achieve_by'>Set Goals</option>
              <option name="filter" value='?ordering=-created_at'>Newest Assignment</option>
            </select>
          </div>
        </div>
        <div>
          {hasLoaded ? (
            searchList.results.length>0 ? (
              searchList.results.map( assignment => (
                <StepsTask 
                  key={assignment.id}
                  {...assignment}
                  activeTasks={activeAssignments}
                  setActiveTasks={setActiveAssignments} 
                  type="active"/>
              ))
            ) : (
              activeList?.length>0 ? (
                activeList.map( assignment => (
                  <StepsTask 
                    key={assignment.id}
                    {...assignment}
                    activeAssignments={activeAssignments}
                    setActiveAssignments={setActiveAssignments} 
                    type="active"/>
                ))
              ) : (
                <p>No assignemnts found.</p>
              )
            )
          ) : (
            <div>
              <Spinner animation="border" />
              <p>Loading assignemnts</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div>
          <h2>Today</h2>
        </div>
        <div>
          {hasLoaded ? (
            todayList?.length>0 ? (
              todayList.map( assignment => (
                <StepsTask 
                  key={assignment.id}
                  {...assignment}
                  activeAssignemnts={activeAssignments}
                  setActiveAssignments={setActiveAssignments} 
                  type="today"/>
              ))
            ) : (
              <p>No assignments set for today!</p>
            )
          ) : (
            <div>
              <Spinner animation="border" />
              <p>Assingments Loading</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div>
          <h2>Completed</h2>
        </div>
        <div>
        {hasLoaded ? (
            achievedList?.length>0 ? (
              achievedList.map( assignment => (
                <StepsTask 
                  key={assignment.id}
                  {...assignment}
                  activeAssignments={activeAssignments}
                  setActiveAssignments={setActiveAssignments} 
                  type="achieved"/>
              ))
            ) : (
              <p>No Completed Assignments!</p>
            )
          ) : (
            <div>
              <Spinner animation="border" />
              <p>Assingments Loading</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TakeStepsDesktop