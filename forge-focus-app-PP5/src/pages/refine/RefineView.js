import React from 'react'

const RefineView = (props) => {
  const {
    name,
    why,
    image,
    setRefineState,
  } = props;

  const handleEdit = () => {
    setRefineState('edit');
  }

  const handleDelete = () => {
    setRefineState('delete');
  }

  return (
    <div>
      <img src={image} alt='refinement'/>
      <div>
        <h2>{name}</h2>
        <p>{why}</p>
        <div>
          <button aria-label="Click to edit refinement" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button aria-label="Click to delete refinement" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RefineView