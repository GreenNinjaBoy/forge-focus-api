/* The code used here was taken form the 'Moments' walkthrough
project. It is imported to the NavBar and used to close the mobile 
nav when a user clicks outside of the menu or when the user selects
a menu item. */

import { useEffect, useRef, useState } from 'react';

const useClickOutsideToggle = () => {

    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)){
        setExpanded(false)
        }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
        document.removeEventListener('mouseup', handleClickOutside);
    }
    }, [ref]);

    return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle