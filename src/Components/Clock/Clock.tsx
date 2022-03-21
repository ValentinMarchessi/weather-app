import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date(Date.now()));

    useEffect(() => {
        setTimeout(() => {
            setTime(new Date(Date.now()));
        },1000)
    }, [time])
    
    return (
        <h2>{time.toUTCString()}</h2>
    )
}