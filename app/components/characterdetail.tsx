'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import AssignLocation from './assignlocation';
import { Character } from '@/app/types/charactertype';

interface CharacterDetailProps {
    id: string;
}

function CharacterDetail({ id }: CharacterDetailProps) {
    const [character, setCharacter] = React.useState<Character | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    React.useEffect(() => {
        setLoading(true);
        // Fetch data from API
        const fetchData = async (url: string) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `{
                        character(id: ${id}) {
                            id
                            name
                            status
                            species
                            type
                            gender
                            origin {
                                name
                            }
                            location {
                                name
                            }
                            image
                            episode {
                                name
                                air_date
                                episode
                            }
                            created
                        }
                    }`,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCharacter(data.data.character);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(apiUrl as string);
    }, [apiUrl, id]);

    if (loading) return <p className="text-center text-muted">Loading...</p>;
    if (error) return <p className="text-center text-danger">Error: {error}</p>;
    if (character === null)
        return <p className="text-center">No character found</p>;

    return (
        <div className="container mt-4" data-aos="fade-up">
            <div className="card mb-4">
                <div className="row g-0">
                    <div className="col-md-4">
                        <Image
                            src={character.image}
                            className="img-fluid rounded-start"
                            alt={character.name}
                            width={220}
                            height={200}
                            layout="intrinsic"
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                            <p className="card-text">
                                <strong>Status:</strong> {character.status}
                            </p>
                            <p className="card-text">
                                <strong>Species:</strong> {character.species}
                            </p>
                            <p className="card-text">
                                <strong>Gender:</strong> {character.gender}
                            </p>
                            <p className="card-text">
                                <strong>Origin:</strong> {character.origin.name}
                            </p>
                            <p className="card-text">
                                <strong>Location:</strong>{' '}
                                {character.location.name}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card-footer text-muted">
                    <AssignLocation character={character} />
                </div>
            </div>
            <div className="row">
                {character.episode.map((episode, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{episode.name}</h5>
                                <p className="card-text">
                                    <strong>Air Date:</strong>{' '}
                                    {episode.air_date}
                                </p>
                                <p className="card-text">
                                    <strong>Episode:</strong> {episode.episode}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterDetail;
