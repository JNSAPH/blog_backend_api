import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id
        }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 360000
    });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
