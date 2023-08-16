import { useState } from "react";

export function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    function getPosition() {
        if (!navigator.geolocation) return setError("Please enable Your location to access This feature");
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
            });
            setIsLoading(false);
        },
        (error) => {
            setError(error.message);
            setIsLoading(false);
        }
        );
    }

    return { isLoading, position, setPosition, error, getPosition };
}