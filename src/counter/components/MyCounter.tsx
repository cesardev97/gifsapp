import { useCounter } from "../hooks/useCounter";

export const MyCounter = () => {

    const { counter, handleAdd, handleSubtract, handleReset } = useCounter();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'cneter' }}>
            <h1>counter: {counter}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={handleAdd}>+1</button>
                <button onClick={handleSubtract}>-1</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
