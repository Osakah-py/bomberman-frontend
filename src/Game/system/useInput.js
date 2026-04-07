import { useEffect, useRef } from "react"

export const useInput = () => 
{
    const keys = useRef({});

    useEffect(() => {
        const onKeyDown = (e) => keys.current[e.key] = true;
        const onKeyUp = (e) => keys.current[e.key] = false;
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }
    }, []);

    return keys;
}