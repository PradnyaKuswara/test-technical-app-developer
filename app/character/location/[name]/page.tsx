'use client';
import React from 'react';
import { Character } from '@/app/types/charactertype';

import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/app/libs/firebaseConfig';
import Image from 'next/image';

function LocationDetailPage({ params }: { params: { name: string } }) {
    const [characters, setCharacters] = React.useState<Character[] | null>(
        null
    );
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setLoading(true);
        const fetchData = async (name: string) => {
            try {
                const locationQuery = query(
                    collection(db, 'locations'),
                    where('name', '==', name)
                );
                const locationSnapshot = await getDocs(locationQuery);

                if (locationSnapshot.empty) {
                    throw new Error('Location not found');
                }

                const characterTemp: Character[] = [];
                locationSnapshot.forEach((doc) => {
                    const data = doc.data();
                    characterTemp.push(data.character);
                });

                setCharacters(characterTemp);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData(params.name as string);
    }, [params.name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!characters) {
        return <div>No characters found</div>;
    }

    return (
        <>
            <div className="container mt-4">
                <div className="row g-4 mt-2">
                    {characters.map((character, index) => (
                        <div
                            className="col-md-4"
                            key={index}
                            data-aos="fade-up"
                        >
                            <div className="card">
                                <div className="d-flex justify-content-center ratio-16x9 border-1 ">
                                    <Image
                                        src={character.image}
                                        className="rounded-top img-fluid"
                                        width={200}
                                        height={200}
                                        alt={character.name}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {character.name}
                                    </h5>
                                    <p className="card-text">
                                        Status: {character.status}
                                    </p>
                                    <p className="card-text">
                                        Species: {character.species}
                                    </p>
                                    <p className="card-text">
                                        Gender: {character.gender}
                                    </p>
                                    <p className="card-text">
                                        Origin: {character.origin.name}
                                    </p>
                                    <p className="card-text">
                                        Location: {character.location.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default LocationDetailPage;
