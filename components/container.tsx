
export default function Container({children}: {children: React.ReactNode}) {

    return (
        <div className="mx-32">
            {children}
        </div>
    )
}