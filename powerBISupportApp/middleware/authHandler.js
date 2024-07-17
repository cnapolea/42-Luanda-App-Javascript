

const authenticationHandler = async (req, res, next) => {
    try {
        // if user's token still valid, this user will be saved in the req.
        if (req.user) next();
        
        // We need to get the authenticated user; therefore before this, we need an authentication router then, we need to check if the token as expired; if so, we then refresh it; else we need to get a fresh token. 

    } catch (err) {
        
    }
}