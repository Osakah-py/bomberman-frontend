import { useCallback, useRef, useState } from "react"

const useBombs = () => {
    const [bombs, setBombs] = useState([]);
    const lastBombTime = useRef(0);
    const COOLDOWN = 1000;

    const placeBomb = useCallback((x, y) => {
        const id = Date.now();
        if (id - lastBombTime.current < COOLDOWN) return ; 
        lastBombTime.current = id; 

        setBombs(prev => [... prev, {id, x, y, exploding : false}]);

        setTimeout(() => {
            setBombs(prev => prev.map(b => b.id === id ? {... b, exploding : true} : b));

            setTimeout(() => {
                setBombs(prev => prev.filter(b => b.id !== id));
            }, 400);
        }, 1000);
        }, []);
        return {bombs, placeBomb};
    }

export default useBombs; 