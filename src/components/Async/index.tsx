import { useEffect, useState } from "react"

export function Async() {
    const [isButtonVisible, setIsButtonVisible] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisible(true)
        }, 1000);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisible(false)
        }, 2000);
    }, [])

    return (
        <div>
            <div>Olar mundão</div>
            {isButtonVisible && <button>Button</button>}
        </div>
    )
}