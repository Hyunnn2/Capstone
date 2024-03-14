import './Option.css'

export default function Option({ hoveredMenu, setHoveredMenu, options }) {
    const handleOptionClick = (option) => {
        console.log(`${option} clicked`);
    }

    return (
        <div className='Option' onMouseEnter={() => setHoveredMenu(hoveredMenu)}>
            {options.map((option, index) => (
                <button className='OptionBtn' key={index} onClick={() => handleOptionClick(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
}