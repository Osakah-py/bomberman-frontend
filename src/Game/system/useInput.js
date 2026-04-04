import { useEffect, useRef } from "react"

export const useInputs = () => 
{
    const keys = useRef({});

    useEffect(() => {
        const onKeyDown = (e) => keys.current[e.keys] = true; 
        const onKeyUp = (e) => keys.current[e.keys] = false;
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }
    }, []);

    return keys;
}