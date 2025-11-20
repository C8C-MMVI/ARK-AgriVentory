function Sidebar({status}){
    const menuItems = [
        {icon: "🏠", text: "Home", link:"/" },
        {icon: "👥", text: "User Dashboard", link:"/" },
        {icon: "⚙️", text: "Settings", link:"/" },
    ]

    return(
        <div>
            <div>
                <h2>App Name</h2>
            </div>
            <nav>
                <ul>
                    {
                        menuItems.map((item, index) =>(<li key={index}><i>{item.icon}</i>{item.text}</li>))
                    }
                </ul>
            </nav>
            <h1>{status ? "Open" : "Close"}</h1>
        </div>
    )
}

export default Sidebar