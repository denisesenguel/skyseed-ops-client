import { useState, useEffect } from 'react';

export default function useSidebar() {
    
    // set breakpoint for window width in px for sidebar autohide
    const breakPoint = 768;
    const [sidebar, setSidebar] = useState((window.innerWidth > breakPoint) ? true : false);

    // on window resize update sidebar state
    useEffect(() => {
        const onResize = () => setSidebar((window.innerWidth > breakPoint) ? true : false);
        window.addEventListener('resize', onResize);
    }, [])

    const toggleSidebar = () => setSidebar(!sidebar);

    return { sidebar, toggleSidebar }
}
