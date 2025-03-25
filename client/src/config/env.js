// Función que accede a las variables de entorno públicas de Next.
export const getEnv = () => ({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    authTokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN,
    defaultAvatar: process.env.NEXT_PUBLIC_DEFAULT_AVATAR,
});
