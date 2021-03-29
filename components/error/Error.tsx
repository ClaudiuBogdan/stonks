
interface ErrorMessageProps{
    message: string
}

export default function Error({message}: ErrorMessageProps) {
    const errorMessage = message ?? 'Something went wrong'
    return (
        <div style={{background: "red", color: "white",}}>{errorMessage}</div>
    )
}
