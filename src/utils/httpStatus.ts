export const HttpStatus = (status: number, message: string): {message: string, status: number} => {
    return {
        status: status,
        message: message
    }
}