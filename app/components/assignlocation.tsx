'use client';

import React from 'react';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/app/libs/firebaseConfig';
import { Character } from '@/app/types/charactertype';

function AssignLocation({ character }: { character: Character }) {
    const [location, setLocation] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(
        null
    );

    const handleAssignLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setError(null);

        if (location.trim() === '') {
            setError('Location is required');
            return;
        }

        try {
            const characterLocationQuery = query(
                collection(db, 'locations'),
                where('character.id', '==', character.id),
                where('name', '==', location)
            );
            const locationSnapshot = await getDocs(characterLocationQuery);

            if (!locationSnapshot.empty) {
                setError('Location name already exists');
                return;
            }

            await addDoc(collection(db, 'locations'), {
                id: `${location}-${character.id}-${new Date().getTime()}`,
                name: location,
                character: character,
                assignedAt: new Date(),
            });
            setSuccessMessage('Location assigned successfully');
            setError(null);
            setLocation('');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };
    return (
        <>
            <div>
                <h2>Assign Location</h2>
                <form onSubmit={handleAssignLocation}>
                    <div>
                        <label htmlFor="locationName">Location Name:</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            id="locationName"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary mt-2">
                        Assign Location
                    </button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && (
                    <p style={{ color: 'green' }}>{successMessage}</p>
                )}
            </div>
        </>
    );
}

export default AssignLocation;
