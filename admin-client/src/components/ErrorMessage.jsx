import "../styles/ErrorMessage.css"
function ErrorMessage({error}){
    return (
        error ? (
        <div className="errors-container">
            {error}
        </div>
        ) : null
    );
}

export default ErrorMessage;