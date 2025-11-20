function Header({onSidebarToggle}){
    return(
        <header>
            <div>
                <button onClick={onSidebarToggle}>Toggle</button>
            </div>
            <div>

            </div>
        </header>
    )
}

export default Header