const TabButton = ({ tab, currentTab, setTab, children }) => {
    return (
        <button onClick={() => setTab(tab)} className={`button tab${tab === currentTab ? ' active' : ''}`}>
            {children}
        </button>
    )
};

export default TabButton;